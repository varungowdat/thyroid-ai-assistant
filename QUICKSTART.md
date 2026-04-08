# Quick Start Guide

Get the Thyroid AI Assistant running in 5 minutes!

## Prerequisites

- Node.js 18+ and npm installed
- Python 3.9+ installed
- Terminal/Command Prompt access

## Step-by-Step Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Set Up Python Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Train ML Models

```bash
# While in backend folder with venv activated
cd models
python train_models.py
cd ..
```

You should see output like:
```
Models trained and saved successfully!
Recurrence model accuracy: 0.XX
Response model accuracy: 0.XX
```

### 4. Start the Backend Server

```bash
# Still in backend folder with venv activated
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Keep this terminal window open!

### 5. Start the Frontend

Open a NEW terminal window and run:

```bash
# From project root directory
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### 6. Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## Using the Application

1. **Navigate**: Use the top menu to explore different sections
2. **Make Predictions**:
   - Click "AI Prediction"
   - Fill in the patient data form
   - Click "Get AI Prediction"
   - View results and download report

3. **Explore**: Check out Symptoms, Find Hospitals, Education, and Health Tips

## Troubleshooting

### Backend won't start?
- Make sure virtual environment is activated
- Check if port 8000 is available
- Verify all Python packages installed: `pip list`

### Frontend won't start?
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available
- Clear npm cache: `npm cache clean --force`

### Predictions fail?
- Ensure backend is running on http://localhost:8000
- Check backend terminal for error messages
- Verify models were trained (check for .pkl files in `backend/models/`)

## What's Next?

- Read the full [README.md](README.md) for detailed information
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Explore the code in `src/` for customization

## Need Help?

1. Check that both backend and frontend are running
2. Look for error messages in terminal windows
3. Verify all installation steps were completed
4. Check browser console for frontend errors (F12)

Enjoy using the Thyroid AI Assistant!
