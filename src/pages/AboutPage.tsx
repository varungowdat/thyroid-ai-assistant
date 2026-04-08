import { Brain, Database, TrendingUp, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our AI Models</h2>
        <p className="text-lg text-gray-600">
          Learn how our machine learning models work to provide thyroid cancer predictions.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-10 w-10 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Machine Learning Technology</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Our AI assistant uses advanced machine learning algorithms trained on comprehensive clinical thyroid
          cancer datasets. The models analyze patient characteristics, clinical features, and pathological data
          to generate predictions about cancer recurrence risk and treatment response.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Model 1: Recurrence Prediction</h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            This model predicts whether thyroid cancer is likely to recur after initial treatment. It
            considers factors such as:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Tumor characteristics (size, type, stage)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Patient demographics and history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Risk stratification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-1">•</span>
              <span>Lymph node involvement</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Model 2: Treatment Response</h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            This model predicts how patients will respond to treatment, categorizing outcomes as:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-1">•</span>
              <span><strong>Excellent:</strong> Complete resolution with no evidence of disease</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold mt-1">•</span>
              <span><strong>Indeterminate:</strong> Uncertain response requiring monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold mt-1">•</span>
              <span><strong>Incomplete:</strong> Persistent disease needing additional treatment</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">How the Models Work</h3>
        <div className="space-y-4 text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Data Collection</h4>
            <p>Clinical data from your input is collected, including demographics, tumor characteristics, and pathology results.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Preprocessing</h4>
            <p>The data is standardized and transformed to ensure consistency with the training dataset.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Feature Extraction</h4>
            <p>Advanced techniques like PCA reduce dimensionality while preserving important patterns.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">4. Prediction</h4>
            <p>Random Forest classifiers analyze the processed data and generate probability scores for each outcome.</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-800 leading-relaxed">
              These AI predictions are intended to support clinical decision-making, not replace it. All
              predictions should be interpreted by qualified healthcare professionals in conjunction with
              clinical judgment, additional diagnostic tests, and patient-specific factors. Never make
              treatment decisions based solely on AI predictions without consulting your healthcare provider.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Model Performance</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our models have been trained on diverse clinical datasets and validated to ensure reliability.
          However, model performance may vary based on:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Quality and completeness of input data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Individual patient characteristics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Rare or unusual presentations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Evolving medical knowledge and treatment protocols</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
