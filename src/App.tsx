import { useState } from 'react';
import Navigation from './components/Navigation';
import PredictionPage from './pages/PredictionPage';
import SymptomsPage from './pages/SymptomsPage';
import HospitalsPage from './pages/HospitalsPage';
import EducationPage from './pages/EducationPage';
import HealthTipsPage from './pages/HealthTipsPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [activeSection, setActiveSection] = useState('prediction');

  const renderSection = () => {
    switch (activeSection) {
      case 'prediction':
        return <PredictionPage />;
      case 'symptoms':
        return <SymptomsPage />;
      case 'hospitals':
        return <HospitalsPage />;
      case 'education':
        return <EducationPage />;
      case 'tips':
        return <HealthTipsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <PredictionPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Thyroid AI Assistant - For educational and informational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
