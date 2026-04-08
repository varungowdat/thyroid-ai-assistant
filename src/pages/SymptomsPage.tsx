import { Stethoscope, Volume2, UtensilsCrossed, AlertCircle, User, Activity } from 'lucide-react';

export default function SymptomsPage() {
  const symptoms = [
    {
      icon: <AlertCircle className="h-8 w-8 text-blue-600" />,
      title: 'Lump in the Neck',
      description: 'A noticeable lump or swelling in the front of the neck that may be visible or palpable.',
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      title: 'Swelling in Thyroid Gland',
      description: 'Enlargement of the thyroid gland, which may cause visible swelling at the base of the neck.',
    },
    {
      icon: <Volume2 className="h-8 w-8 text-blue-600" />,
      title: 'Hoarseness in Voice',
      description: 'Persistent changes in voice quality or hoarseness that does not improve over time.',
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-blue-600" />,
      title: 'Difficulty Swallowing',
      description: 'Trouble swallowing food or liquids, or a feeling of something stuck in the throat.',
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: 'Neck Pain',
      description: 'Persistent pain in the neck or throat area that may radiate to the ears.',
    },
    {
      icon: <User className="h-8 w-8 text-blue-600" />,
      title: 'Enlarged Lymph Nodes',
      description: 'Swollen lymph nodes in the neck that may indicate cancer spread.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Thyroid Cancer Symptoms</h2>
        <p className="text-lg text-gray-600">
          Thyroid cancer may not cause symptoms in its early stages. However, as it grows, you may notice
          one or more of the following signs. If you experience any of these symptoms persistently, consult
          your healthcare provider.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {symptoms.map((symptom, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              {symptom.icon}
              <h3 className="text-xl font-semibold text-gray-900">{symptom.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{symptom.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-3">When to See a Doctor</h3>
        <p className="text-blue-800 leading-relaxed">
          If you notice any persistent symptoms, especially a lump in your neck or changes in your voice,
          schedule an appointment with your healthcare provider. Early detection and treatment of thyroid
          cancer can significantly improve outcomes.
        </p>
      </div>
    </div>
  );
}
