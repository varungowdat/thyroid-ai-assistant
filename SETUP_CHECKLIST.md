# Setup Checklist

Use this checklist to ensure your Thyroid AI Assistant is properly set up.

## Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Python 3.9+ installed (`python --version`)
- [ ] pip installed (`pip --version`)

## Backend Setup
- [ ] Created virtual environment (`python -m venv venv`)
- [ ] Activated virtual environment
- [ ] Installed Python dependencies (`pip install -r requirements.txt`)
- [ ] Trained ML models (`python backend/models/train_models.py`)
- [ ] Verified .pkl files exist in `backend/models/`:
  - [ ] recurrence_model.pkl
  - [ ] response_model.pkl
  - [ ] scaler.pkl
  - [ ] pca.pkl

## Frontend Setup
- [ ] Installed npm dependencies (`npm install`)
- [ ] Verified package.json exists
- [ ] Verified node_modules folder created

## Running the Application
- [ ] Backend server started (`python backend/main.py`)
- [ ] Backend accessible at http://localhost:8000
- [ ] Backend health check works (visit http://localhost:8000/health)
- [ ] Frontend dev server started (`npm run dev`)
- [ ] Frontend accessible at http://localhost:5173
- [ ] Can navigate between sections
- [ ] Can submit prediction form
- [ ] Predictions return successfully

## Production Build
- [ ] Frontend builds successfully (`npm run build`)
- [ ] dist/ folder created with assets
- [ ] No build errors or warnings

## Optional Enhancements
- [ ] Google Maps API key configured (for real hospital locations)
- [ ] Environment variables set up (.env file)
- [ ] Custom domain configured (for deployment)

## Troubleshooting Completed
- [ ] All terminal commands work without errors
- [ ] No console errors in browser (F12)
- [ ] API calls complete successfully
- [ ] Models load properly (check backend logs)

## Documentation Reviewed
- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Understand API endpoints
- [ ] Know how to deploy (DEPLOYMENT.md)

---

If all items are checked, your Thyroid AI Assistant is ready to use!

**Note**: This is a demonstration application. Before using in a production/clinical environment, ensure:
- Real clinical datasets for model training
- HIPAA compliance (if in USA)
- Data privacy and security measures
- Professional medical oversight
- Proper regulatory approvals
