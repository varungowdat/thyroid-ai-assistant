from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Optional
import os
from utils.preprocessing import preprocess_patient_data

app = FastAPI(title="Thyroid AI Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models_dir = os.path.join(os.path.dirname(__file__), 'models')

try:
    recurrence_model = joblib.load(os.path.join(models_dir, 'recurrence_model.pkl'))
    response_model = joblib.load(os.path.join(models_dir, 'response_model.pkl'))
    scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))
    pca = joblib.load(os.path.join(models_dir, 'pca.pkl'))
except Exception as e:
    print(f"Warning: Could not load models: {e}")
    recurrence_model = None
    response_model = None
    scaler = None
    pca = None

class PatientData(BaseModel):
    age: float
    gender: str
    smoking: str
    hx_smoking: str
    hx_radiotherapy: str
    thyroid_function: str
    physical_examination: str
    adenopathy: str
    pathology: str
    focality: str
    risk: str
    t: str
    n: str
    m: Optional[str] = "M0"

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    confidence: float
    explanation: str

@app.get("/")
def read_root():
    return {"message": "Thyroid AI Assistant API", "status": "running"}

@app.get("/health")
def health_check():
    models_loaded = all([recurrence_model, response_model, scaler, pca])
    return {
        "status": "healthy" if models_loaded else "degraded",
        "models_loaded": models_loaded
    }

@app.post("/predict-recurrence", response_model=PredictionResponse)
def predict_recurrence(patient: PatientData):
    if not all([recurrence_model, scaler, pca]):
        raise HTTPException(status_code=503, detail="Models not loaded")

    try:
        features = preprocess_patient_data(patient.dict())

        features_scaled = scaler.transform(features)
        features_pca = pca.transform(features_scaled)

        prediction = recurrence_model.predict(features_pca)[0]
        probabilities = recurrence_model.predict_proba(features_pca)[0]

        result = "Yes" if prediction == 1 else "No"
        probability = float(probabilities[prediction])
        confidence = float(max(probabilities))

        if result == "Yes":
            explanation = "Based on the clinical data provided, the model predicts a higher likelihood of cancer recurrence. Regular monitoring and follow-up with your healthcare provider is recommended."
        else:
            explanation = "Based on the clinical data provided, the model predicts a lower likelihood of cancer recurrence. Continue with recommended follow-up care and monitoring."

        return PredictionResponse(
            prediction=result,
            probability=probability * 100,
            confidence=confidence * 100,
            explanation=explanation
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/predict-response", response_model=PredictionResponse)
def predict_response(patient: PatientData):
    if not all([response_model, scaler, pca]):
        raise HTTPException(status_code=503, detail="Models not loaded")

    try:
        features = preprocess_patient_data(patient.dict())

        features_scaled = scaler.transform(features)
        features_pca = pca.transform(features_scaled)

        prediction = response_model.predict(features_pca)[0]
        probabilities = response_model.predict_proba(features_pca)[0]

        response_map = {0: "Excellent", 1: "Indeterminate", 2: "Incomplete"}
        result = response_map[prediction]
        probability = float(probabilities[prediction])
        confidence = float(max(probabilities))

        explanations = {
            "Excellent": "The model predicts an excellent response to treatment. This suggests complete resolution with no evidence of disease.",
            "Indeterminate": "The model predicts an indeterminate response to treatment. Further monitoring and evaluation may be needed to assess treatment effectiveness.",
            "Incomplete": "The model predicts an incomplete response to treatment. Additional treatment options should be discussed with your healthcare provider."
        }

        return PredictionResponse(
            prediction=result,
            probability=probability * 100,
            confidence=confidence * 100,
            explanation=explanations[result]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
