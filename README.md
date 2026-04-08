# Thyroid AI Assistant

A modern AI-powered web application for thyroid cancer risk assessment and treatment response prediction using machine learning models.

## Features

- **AI Prediction System**: Predict thyroid cancer recurrence and treatment response using ML models
- **Symptoms Information**: Learn about common thyroid cancer symptoms
- **Hospital Finder**: Locate nearby hospitals and thyroid specialists
- **Educational Content**: Comprehensive information about thyroid cancer, risk factors, and treatments
- **Health Tips**: Evidence-based recommendations for thyroid health
- **Downloadable Reports**: Generate and download prediction reports

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

### Backend
- Python FastAPI
- scikit-learn for ML models
- Pandas & NumPy for data processing
- Joblib for model serialization

### Machine Learning
- Random Forest Classifier
- StandardScaler for preprocessing
- PCA for dimensionality reduction

## Project Structure

```
thyroid-ai-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main application
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
├── backend/
│   ├── models/              # Trained ML models (.pkl files)
│   ├── utils/               # Preprocessing utilities
│   ├── main.py              # FastAPI application
│   └── requirements.txt
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- pip

### Step 1: Clone or Download the Project

```bash
cd thyroid-ai-assistant
```

### Step 2: Set Up the Backend

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train the ML models
cd models
python train_models.py
cd ..
```

### Step 3: Set Up the Frontend

```bash
# Navigate to the project root
cd ..

# Install dependencies
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py
```

The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

In a new terminal:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Health Check
- `GET /` - API status
- `GET /health` - Health check with model status

### Predictions
- `POST /predict-recurrence` - Predict cancer recurrence risk
- `POST /predict-response` - Predict treatment response

### Example API Request

```json
POST /predict-recurrence
Content-Type: application/json

{
  "age": 45,
  "gender": "F",
  "smoking": "No",
  "hx_smoking": "No",
  "hx_radiotherapy": "No",
  "thyroid_function": "Euthyroid",
  "physical_examination": "Normal",
  "adenopathy": "No",
  "pathology": "Papillary",
  "focality": "Uni-Focal",
  "risk": "Low",
  "t": "T1a",
  "n": "N0",
  "m": "M0"
}
```

### Example API Response

```json
{
  "prediction": "No",
  "probability": 75.3,
  "confidence": 75.3,
  "explanation": "Based on the clinical data provided, the model predicts a lower likelihood of cancer recurrence."
}
```

## Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:5173`

2. **Navigate Sections**: Use the navigation menu to explore different sections:
   - AI Prediction
   - Symptoms
   - Find Hospitals
   - Education
   - Health Tips
   - About AI Models

3. **Get Predictions**:
   - Fill in the patient clinical data form
   - Click "Get AI Prediction"
   - View results for both recurrence risk and treatment response
   - Download the prediction report if needed

4. **Explore Educational Content**: Learn about thyroid cancer, symptoms, and health tips

## Model Information

### Recurrence Prediction Model
Predicts whether thyroid cancer will recur after treatment (Yes/No).

**Input Features:**
- Patient demographics (age, gender)
- Medical history (smoking, radiotherapy)
- Thyroid function
- Physical examination findings
- Pathology results
- TNM staging

### Treatment Response Model
Predicts treatment response (Excellent/Indeterminate/Incomplete).

**Response Categories:**
- **Excellent**: Complete resolution with no evidence of disease
- **Indeterminate**: Uncertain response requiring monitoring
- **Incomplete**: Persistent disease needing additional treatment

## Building for Production

### Frontend

```bash
npm run build
```

Built files will be in the `dist/` directory.

### Backend

For production deployment, use a production ASGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Environment Variables

### Backend (Optional)
Create a `.env` file in the `backend/` directory:

```
FRONTEND_URL=http://localhost:5173
```

## Important Disclaimers

- This application is for educational and informational purposes only
- AI predictions should NOT replace professional medical advice
- Always consult with qualified healthcare providers for diagnosis and treatment decisions
- The ML models are trained on sample data and should be retrained with real clinical datasets for production use

## Future Enhancements

- Google Maps API integration for real hospital locations
- User authentication and patient data storage
- Historical prediction tracking
- PDF report generation
- Multi-language support
- Mobile application

## Troubleshooting

### Backend Issues

**Models not loading:**
- Ensure you've run `python train_models.py` in the `backend/models/` directory
- Check that `.pkl` files exist in `backend/models/`

**Port already in use:**
- Change the port in `main.py`: `uvicorn.run(app, host="0.0.0.0", port=8001)`

### Frontend Issues

**API connection errors:**
- Verify the backend is running on `http://localhost:8000`
- Check browser console for CORS errors
- Ensure API URL in `src/services/api.ts` matches your backend URL

**Build errors:**
- Delete `node_modules/` and run `npm install` again
- Clear cache: `npm run build -- --force`

## License

This project is for educational purposes. Please ensure compliance with healthcare regulations and data privacy laws before deploying in production.

## Support

For issues or questions, please review the code documentation and API endpoints.
