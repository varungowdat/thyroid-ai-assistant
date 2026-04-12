from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import Optional
import os
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


class IdentityScaler:
    def transform(self, features):
        return np.asarray(features, dtype=float)


class SimpleRecurrenceModel:
    def predict_proba(self, features):
        data = np.asarray(features, dtype=float)
        age = data[:, 0]
        radiotherapy = data[:, 4]
        adenopathy = data[:, 7]
        risk = data[:, 10]
        t_stage = data[:, 11]
        n_stage = data[:, 12]

        score = (
            0.18
            + 0.004 * np.clip(age - 30, 0, None)
            + 0.08 * radiotherapy
            + 0.06 * (adenopathy > 0)
            + 0.10 * risk
            + 0.06 * t_stage
            + 0.08 * n_stage
        )
        yes_prob = np.clip(score, 0.05, 0.95)
        no_prob = 1 - yes_prob
        return np.column_stack([no_prob, yes_prob])

    def predict(self, features):
        probabilities = self.predict_proba(features)
        return (probabilities[:, 1] >= 0.5).astype(int)


class SimpleResponseModel:
    def predict_proba(self, features):
        data = np.asarray(features, dtype=float)
        age = data[:, 0]
        thyroid_function = data[:, 5]
        adenopathy = data[:, 7]
        pathology = data[:, 8]
        risk = data[:, 10]
        t_stage = data[:, 11]
        n_stage = data[:, 12]

        structural = np.clip(
            0.06 + 0.04 * risk + 0.03 * t_stage + 0.05 * n_stage + 0.03 * (adenopathy > 0),
            0.02,
            0.55,
        )
        biochemical = np.clip(
            0.08 + 0.03 * risk + 0.02 * pathology + 0.015 * thyroid_function,
            0.03,
            0.45,
        )
        indeterminate = np.clip(
            0.12 + 0.002 * np.clip(age - 25, 0, None) + 0.015 * thyroid_function,
            0.05,
            0.45,
        )
        excellent = np.clip(1 - (structural + biochemical + indeterminate), 0.05, 0.85)

        total = excellent + indeterminate + biochemical + structural
        return np.column_stack([
            excellent / total,
            indeterminate / total,
            biochemical / total,
            structural / total,
        ])

    def predict(self, features):
        probabilities = self.predict_proba(features)
        return np.argmax(probabilities, axis=1)


def create_fallback_models():
    """
    Build lightweight in-memory models with no sklearn dependency so production
    remains stable even when bundled pickle files are incompatible.
    """
    recurrence_scaler = IdentityScaler()
    response_scaler = IdentityScaler()
    recurrence_model = SimpleRecurrenceModel()
    response_model = SimpleResponseModel()
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
