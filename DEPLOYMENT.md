# Deployment Guide

## Local Development

### Quick Start

1. **Backend Setup**:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd models && python train_models.py && cd ..
python main.py
```

2. **Frontend Setup** (in new terminal):
```bash
npm install
npm run dev
```

3. Access at `http://localhost:5173`

## Production Deployment

### Option 1: Traditional Server

#### Backend (FastAPI)

1. Install production dependencies:
```bash
pip install gunicorn
```

2. Run with Gunicorn:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

3. Use a reverse proxy (Nginx) for SSL and load balancing

#### Frontend (React)

1. Build the application:
```bash
npm run build
```

2. Serve the `dist/` folder with Nginx or any static hosting service

### Option 2: Docker Deployment

#### Backend Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

RUN cd models && python train_models.py && cd ..

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "8000:8000"
    environment:
      - FRONTEND_URL=http://localhost:5173

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Option 3: Cloud Platform Deployment

#### Vercel (Frontend)
1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

#### Railway/Render (Backend)
1. Connect repository
2. Configure:
   - Build Command: `pip install -r requirements.txt && cd models && python train_models.py`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Deploy

## Environment Variables

### Production Frontend
Update API URL in production:
```
VITE_API_URL=https://your-backend-url.com
```

### Production Backend
```
FRONTEND_URL=https://your-frontend-url.com
```

## Security Considerations

1. Enable HTTPS/SSL certificates
2. Configure CORS properly for production domains
3. Rate limiting on API endpoints
4. Input validation and sanitization
5. Secure model files
6. Environment variable management
7. Regular dependency updates

## Monitoring

- Set up logging for both frontend and backend
- Monitor API response times
- Track model prediction accuracy
- Set up error reporting (e.g., Sentry)
- Health check endpoints for uptime monitoring

## Scaling

- Use load balancers for multiple backend instances
- CDN for frontend static assets
- Database for storing prediction history (optional)
- Caching layer for frequently accessed data
- Container orchestration (Kubernetes) for large-scale deployments
