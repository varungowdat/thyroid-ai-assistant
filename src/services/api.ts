import { PatientData, PredictionResult } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';

export const predictRecurrence = async (data: PatientData): Promise<PredictionResult> => {
  const response = await fetch(`${API_BASE_URL}/predict-recurrence`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to get recurrence prediction');
  }

  return response.json();
};

export const predictResponse = async (data: PatientData): Promise<PredictionResult> => {
  const response = await fetch(`${API_BASE_URL}/predict-response`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to get response prediction');
  }

  return response.json();
};
