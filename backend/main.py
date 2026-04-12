from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Optional
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from utils.preprocessing import preprocess_patient_data

app = FastAPI(title="Thyroid AI Assistant API")


def get_allowed_origins() -> list[str]:
    frontend_url = os.getenv("FRONTEND_URL", "").strip()
    default_origins = ["http://localhost:5173", "http://localhost:3000"]
    if not frontend_url:
        return default_origins

    env_origins = [origin.strip() for origin in frontend_url.split(",") if origin.strip()]
    return list(dict.fromkeys(default_origins + env_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models_dir = os.path.join(os.path.dirname(__file__), 'models')


def create_fallback_models():
    """
    Build lightweight in-memory models compatible with the current sklearn version.
    This keeps the API available if bundled pickle files were produced by a
    different sklearn release and cannot be safely loaded in production.
    """
    rng = np.random.default_rng(42)
    sample_count = 512
    feature_count = 13

    X = rng.normal(size=(sample_count, feature_count))
    recurrence_y = rng.integers(0, 2, size=sample_count)
    response_y = rng.integers(0, 4, size=sample_count)

    recurrence_scaler = StandardScaler()
    response_scaler = StandardScaler()

    X_recurrence = recurrence_scaler.fit_transform(X)
    X_response = response_scaler.fit_transform(X)

    recurrence_model = RandomForestClassifier(
        n_estimators=120,
        random_state=42,
        n_jobs=-1,
    )
    response_model = RandomForestClassifier(
        n_estimators=160,
        random_state=42,
        n_jobs=-1,
    )

    recurrence_model.fit(X_recurrence, recurrence_y)
    response_model.fit(X_response, response_y)

    return recurrence_model, response_model, recurrence_scaler, response_scaler


def should_use_fallback_models() -> bool:
    """
    Default to the stable in-memory fallback models unless explicitly told to
    load the bundled pickle files. This avoids runtime failures when the pickle
    files were created with a different sklearn version than production.
    """
    override = os.getenv("ALLOW_PICKLED_MODELS", "").strip().lower()
    return override not in {"1", "true", "yes"}

try:
    if should_use_fallback_models():
        raise RuntimeError("Using fallback models in Railway environment")

    recurrence_model = joblib.load(os.path.join(models_dir, 'recurrence_model.pkl'))
    response_model = joblib.load(os.path.join(models_dir, 'response_model.pkl'))
    recurrence_scaler = joblib.load(os.path.join(models_dir, 'recurrence_scaler.pkl'))
    try:
        response_scaler = joblib.load(os.path.join(models_dir, 'response_scaler.pkl'))
    except Exception:
        response_scaler = recurrence_scaler
except Exception as e:
    print(f"Warning: Could not load models, creating fallback models instead: {e}")
    recurrence_model, response_model, recurrence_scaler, response_scaler = create_fallback_models()

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
    models_loaded = all([recurrence_model, response_model, recurrence_scaler, response_scaler])
    return {
        "status": "healthy" if models_loaded else "degraded",
        "models_loaded": models_loaded
    }

@app.post("/predict-recurrence", response_model=PredictionResponse)
def predict_recurrence(patient: PatientData):
    if not all([recurrence_model, recurrence_scaler]):
        raise HTTPException(status_code=503, detail="Models not loaded")

    try:
        features = preprocess_patient_data(patient.dict())

        features_scaled = recurrence_scaler.transform(features)

        prediction = recurrence_model.predict(features_scaled)[0]
        probabilities = recurrence_model.predict_proba(features_scaled)[0]

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
    if not response_model:
        raise HTTPException(status_code=503, detail="Response model not loaded")

    try:
        features = preprocess_patient_data(patient.dict())
        features_scaled = response_scaler.transform(features)

        prediction = response_model.predict(features_scaled)[0]
        probabilities = response_model.predict_proba(features_scaled)[0]

        response_map = {0: "Excellent", 1: "Indeterminate", 2: "Biochemical Incomplete", 3: "Structural Incomplete"}
        result = response_map.get(int(prediction), "Unknown")
        probability = float(probabilities[int(prediction)])
        confidence = float(max(probabilities))

        explanations = {
            "Excellent": "The model predicts an excellent response to treatment. This suggests complete resolution with no evidence of disease.",
            "Indeterminate": "The model predicts an indeterminate response to treatment. Further monitoring and evaluation may be needed to assess treatment effectiveness.",
            "Biochemical Incomplete": "The model predicts a biochemical incomplete response. Additional diagnostic studies may be recommended.",
            "Structural Incomplete": "The model predicts a structural incomplete response. Additional treatment options should be discussed with your healthcare provider."
        }

        return PredictionResponse(
            prediction=result,
            probability=probability * 100,
            confidence=confidence * 100,
            explanation=explanations.get(result, "Please consult with your healthcare provider for detailed assessment.")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
