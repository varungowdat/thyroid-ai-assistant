import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import PredictionResults from '../components/PredictionResults';
import { PatientData, PredictionResult } from '../types';
import { predictRecurrence, predictResponse } from '../services/api';

export default function PredictionPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recurrenceResult, setRecurrenceResult] = useState<PredictionResult | null>(null);
  const [responseResult, setResponseResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (data: PatientData) => {
    setLoading(true);
    setError(null);
    setRecurrenceResult(null);
    setResponseResult(null);

    try {
      const processedData = {
        ...data,
        age: typeof data.age === 'string' ? parseFloat(data.age) || 0 : data.age,
      };

      const [recurrence, response] = await Promise.all([
        predictRecurrence(processedData),
        predictResponse(processedData),
      ]);

      setRecurrenceResult(recurrence);
      setResponseResult(response);
    } catch (err) {
      setError('Failed to get predictions. Please ensure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Cancer Prediction</h2>
        <p className="text-lg text-gray-600">
          Enter clinical data below to receive AI-powered predictions for thyroid cancer recurrence risk and
          treatment response.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Patient Clinical Data</h3>
        <PredictionForm onSubmit={handleSubmit} loading={loading} error={error} />
      </div>

      {(recurrenceResult || responseResult) && (
        <PredictionResults recurrence={recurrenceResult} response={responseResult} />
      )}
    </div>
  );
}
