import { useState } from 'react';
import { PatientData } from '../types';
import { AlertCircle, Loader2 } from 'lucide-react';

interface PredictionFormProps {
  onSubmit: (data: PatientData) => void;
  loading: boolean;
  error: string | null;
}

export default function PredictionForm({ onSubmit, loading, error }: PredictionFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    age: '',
    gender: '',
    smoking: '',
    hx_smoking: '',
    hx_radiotherapy: '',
    thyroid_function: '',
    physical_examination: '',
    adenopathy: '',
    pathology: '',
    focality: '',
    risk: '',
    t: '',
    n: '',
    m: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseFloat(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="120"
            placeholder="Enter age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">History of Smoking</label>
          <select
            name="hx_smoking"
            value={formData.hx_smoking}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">History of Radiotherapy</label>
          <select
            name="hx_radiotherapy"
            value={formData.hx_radiotherapy}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thyroid Function</label>
          <select
            name="thyroid_function"
            value={formData.thyroid_function}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Euthyroid">Euthyroid</option>
            <option value="Clinical Hyperthyroidism">Clinical Hyperthyroidism</option>
            <option value="Subclinical Hyperthyroidism">Subclinical Hyperthyroidism</option>
            <option value="Clinical Hypothyroidism">Clinical Hypothyroidism</option>
            <option value="Subclinical Hypothyroidism">Subclinical Hypothyroidism</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Physical Examination</label>
          <select
            name="physical_examination"
            value={formData.physical_examination}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Normal">Normal</option>
            <option value="Single nodular goiter-left">Single nodular goiter-left</option>
            <option value="Single nodular goiter-right">Single nodular goiter-right</option>
            <option value="Multinodular goiter">Multinodular goiter</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adenopathy</label>
          <select
            name="adenopathy"
            value={formData.adenopathy}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="No">No</option>
            <option value="Right">Right</option>
            <option value="Left">Left</option>
            <option value="Bilateral">Bilateral</option>
            <option value="Posterior">Posterior</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pathology</label>
          <select
            name="pathology"
            value={formData.pathology}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Micropapillary">Micropapillary</option>
            <option value="Papillary">Papillary</option>
            <option value="Follicular">Follicular</option>
            <option value="Hurthle cell">Hurthle cell</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Focality</label>
          <select
            name="focality"
            value={formData.focality}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Uni-Focal">Uni-Focal</option>
            <option value="Multi-Focal">Multi-Focal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
          <select
            name="risk"
            value={formData.risk}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="Low">Low</option>
            <option value="Intermediate">Intermediate</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">T Stage</label>
          <select
            name="t"
            value={formData.t}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="T1a">T1a</option>
            <option value="T1b">T1b</option>
            <option value="T2">T2</option>
            <option value="T3a">T3a</option>
            <option value="T3b">T3b</option>
            <option value="T4a">T4a</option>
            <option value="T4b">T4b</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">N Stage</label>
          <select
            name="n"
            value={formData.n}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="N0">N0</option>
            <option value="N1a">N1a</option>
            <option value="N1b">N1b</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">M Stage</label>
          <select
            name="m"
            value={formData.m}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select...</option>
            <option value="M0">M0</option>
            <option value="M1">M1</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {loading ? 'Analyzing...' : 'Get AI Prediction'}
      </button>
    </form>
  );
}
