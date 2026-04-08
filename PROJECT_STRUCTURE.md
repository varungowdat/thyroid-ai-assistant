# Project Structure

```
thyroid-ai-assistant/
│
├── backend/                          # Python FastAPI Backend
│   ├── models/                       # ML Models Directory
│   │   ├── train_models.py          # Script to train ML models
│   │   ├── recurrence_model.pkl     # (Generated) Recurrence prediction model
│   │   ├── response_model.pkl       # (Generated) Treatment response model
│   │   ├── scaler.pkl               # (Generated) StandardScaler
│   │   └── pca.pkl                  # (Generated) PCA transformer
│   │
│   ├── utils/                        # Utility Functions
│   │   └── preprocessing.py         # Data preprocessing utilities
│   │
│   ├── main.py                       # FastAPI application & endpoints
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Example environment variables
│   └── README.md                     # Backend documentation
│
├── src/                              # React Frontend Source
│   ├── components/                   # Reusable Components
│   │   ├── Navigation.tsx           # Top navigation bar
│   │   ├── PredictionForm.tsx       # Patient data input form
│   │   ├── PredictionResults.tsx    # Results display with download
│   │   └── RiskGauge.tsx            # Risk visualization gauge
│   │
│   ├── pages/                        # Page Components
│   │   ├── PredictionPage.tsx       # AI prediction interface
│   │   ├── SymptomsPage.tsx         # Symptoms information
│   │   ├── HospitalsPage.tsx        # Hospital finder
│   │   ├── EducationPage.tsx        # Educational content
│   │   ├── HealthTipsPage.tsx       # Health tips
│   │   └── AboutPage.tsx            # About AI models
│   │
│   ├── services/                     # API Services
│   │   └── api.ts                   # Backend API calls
│   │
│   ├── types/                        # TypeScript Types
│   │   └── index.ts                 # Type definitions
│   │
│   ├── App.tsx                       # Main application component
│   ├── main.tsx                      # React entry point
│   ├── index.css                     # Global styles & animations
│   └── vite-env.d.ts                # Vite type definitions
│
├── dist/                             # (Generated) Production build
│
├── node_modules/                     # (Generated) npm dependencies
│
├── index.html                        # HTML entry point
├── package.json                      # npm configuration
├── package-lock.json                 # npm lock file
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.app.json                 # TypeScript app config
├── tsconfig.node.json                # TypeScript node config
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── eslint.config.js                  # ESLint configuration
│
├── README.md                         # Main project documentation
├── QUICKSTART.md                     # Quick start guide
├── DEPLOYMENT.md                     # Deployment instructions
├── PROJECT_STRUCTURE.md              # This file
└── .env.example                      # Example environment variables
```

## Key Components

### Backend API (`backend/main.py`)
- FastAPI application with CORS enabled
- Two prediction endpoints:
  - `/predict-recurrence` - Cancer recurrence prediction
  - `/predict-response` - Treatment response prediction
- Health check endpoints
- Model loading and preprocessing

### Frontend App (`src/App.tsx`)
- Single-page application with section-based navigation
- State management for active section
- Responsive layout with healthcare theme

### ML Models (`backend/models/`)
- Random Forest Classifiers for predictions
- StandardScaler for feature scaling
- PCA for dimensionality reduction
- Training script included

### Pages
1. **Prediction Page**: Main AI prediction interface
2. **Symptoms Page**: Information about thyroid cancer symptoms
3. **Hospitals Page**: Find nearby specialists (mock data)
4. **Education Page**: Comprehensive thyroid cancer information
5. **Health Tips Page**: Evidence-based health recommendations
6. **About Page**: ML model information and disclaimers

## Data Flow

```
User Input (Form)
    ↓
Frontend (React)
    ↓
API Call (Fetch)
    ↓
Backend (FastAPI)
    ↓
Preprocessing (StandardScaler + PCA)
    ↓
ML Models (Random Forest)
    ↓
Prediction Results
    ↓
JSON Response
    ↓
Frontend Display
    ↓
User sees results + can download report
```

## Technology Stack Summary

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)

**Backend:**
- Python 3.9+
- FastAPI
- scikit-learn
- Pandas, NumPy
- Joblib

**Development:**
- ESLint for linting
- TypeScript for type safety
- Hot Module Replacement (HMR)
- CORS enabled for local development
