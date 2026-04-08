import { BookOpen, Microscope, TestTube, Pill } from 'lucide-react';

export default function EducationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thyroid Cancer Education</h2>
        <p className="text-lg text-gray-600">
          Learn about thyroid cancer, its risk factors, diagnostic procedures, and treatment options.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">What is Thyroid Cancer?</h3>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">
          Thyroid cancer occurs when abnormal cells begin to grow in the thyroid gland. The thyroid is a
          butterfly-shaped gland located at the base of the neck that produces hormones regulating metabolism,
          heart rate, and body temperature.
        </p>
        <p className="text-gray-600 leading-relaxed">
          There are several types of thyroid cancer, with papillary thyroid cancer being the most common. Most
          thyroid cancers are highly treatable, especially when detected early.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Microscope className="h-8 w-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Risk Factors</h3>
        </div>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span><strong>Gender and Age:</strong> Women are three times more likely to develop thyroid cancer. It can occur at any age but is most common in women in their 40s and 50s.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span><strong>Radiation Exposure:</strong> Exposure to radiation, especially during childhood, increases risk.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span><strong>Family History:</strong> Having a family member with thyroid cancer increases your risk.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span><strong>Genetic Conditions:</strong> Certain inherited genetic syndromes increase thyroid cancer risk.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span><strong>Iodine Deficiency:</strong> Low iodine levels in the diet may increase risk for certain types.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <TestTube className="h-8 w-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Diagnostic Tests</h3>
        </div>
        <div className="space-y-4 text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">TSH Blood Test</h4>
            <p>Measures thyroid-stimulating hormone levels to assess thyroid function.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Thyroid Ultrasound</h4>
            <p>Uses sound waves to create images of the thyroid and identify nodules or abnormalities.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Fine Needle Aspiration Biopsy</h4>
            <p>Removes a small sample of tissue from a thyroid nodule to check for cancer cells.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">CT or MRI Scan</h4>
            <p>Provides detailed images to determine if cancer has spread to other areas.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Pill className="h-8 w-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-gray-900">Treatment Options</h3>
        </div>
        <div className="space-y-4 text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Surgery (Thyroidectomy)</h4>
            <p>Removal of all or part of the thyroid gland is the most common treatment.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Radioactive Iodine Therapy</h4>
            <p>Uses radioactive iodine to destroy remaining thyroid tissue and cancer cells after surgery.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Thyroid Hormone Therapy</h4>
            <p>Provides the body with thyroid hormones and may help prevent cancer recurrence.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">External Radiation Therapy</h4>
            <p>Uses high-energy beams to kill cancer cells, typically for advanced cases.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Targeted Drug Therapy</h4>
            <p>Medications that target specific abnormalities in cancer cells.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
