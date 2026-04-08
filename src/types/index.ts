export interface PatientData {
  age: number;
  gender: string;
  smoking: string;
  hx_smoking: string;
  hx_radiotherapy: string;
  thyroid_function: string;
  physical_examination: string;
  adenopathy: string;
  pathology: string;
  focality: string;
  risk: string;
  t: string;
  n: string;
  m: string;
}

export interface PredictionResult {
  prediction: string;
  probability: number;
  confidence: number;
  explanation: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
}
