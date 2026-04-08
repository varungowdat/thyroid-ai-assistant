# Thyroid AI Assistant - Backend

FastAPI backend service for thyroid cancer prediction using machine learning models.

## Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Train the ML models:
```bash
cd models
python train_models.py
cd ..
```

4. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Models

The backend uses four serialized models:
- `recurrence_model.pkl` - Predicts cancer recurrence
- `response_model.pkl` - Predicts treatment response
- `scaler.pkl` - StandardScaler for preprocessing
- `pca.pkl` - PCA for dimensionality reduction

## Production Deployment

For production, use Gunicorn with Uvicorn workers:

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```
