import { Heart, Apple, Dumbbell, Cigarette, Calendar, Shield } from 'lucide-react';

export default function HealthTipsPage() {
  const tips = [
    {
      icon: <Apple className="h-8 w-8 text-blue-600" />,
      title: 'Maintain Iodine Intake',
      description: 'Ensure adequate iodine in your diet through iodized salt, seafood, dairy products, and eggs. Iodine is essential for proper thyroid function.',
      color: 'bg-green-50 border-green-200',
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: 'Regular Screening',
      description: 'Schedule regular thyroid screenings, especially if you have risk factors. Early detection significantly improves treatment outcomes.',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Cigarette className="h-8 w-8 text-blue-600" />,
      title: 'Avoid Smoking',
      description: 'Smoking can increase the risk of thyroid cancer and complicate treatment. Quit smoking and avoid secondhand smoke exposure.',
      color: 'bg-red-50 border-red-200',
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: 'Healthy Diet',
      description: 'Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Antioxidant-rich foods may help reduce cancer risk.',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      icon: <Dumbbell className="h-8 w-8 text-blue-600" />,
      title: 'Regular Exercise',
      description: 'Engage in regular physical activity to maintain a healthy weight and boost immune function. Aim for at least 150 minutes of moderate exercise per week.',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Limit Radiation Exposure',
      description: 'Avoid unnecessary medical radiation, especially to the head and neck. Discuss alternatives with your healthcare provider when possible.',
      color: 'bg-yellow-50 border-yellow-200',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthy Thyroid Tips</h2>
        <p className="text-lg text-gray-600">
          Follow these evidence-based recommendations to maintain thyroid health and reduce cancer risk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md border ${tip.color} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{tip.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Recommendations</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Stay informed about your family medical history and share it with your doctor.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Perform regular self-examinations of your neck to check for lumps or swelling.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Manage stress through meditation, yoga, or other relaxation techniques.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Get adequate sleep to support overall health and immune function.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold mt-1">•</span>
            <span>Discuss any concerns or symptoms with your healthcare provider promptly.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
