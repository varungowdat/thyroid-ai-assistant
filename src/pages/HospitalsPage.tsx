import { useState } from 'react';
import { MapPin, Search, Navigation, Phone, Star } from 'lucide-react';

export default function HospitalsPage() {
  const [location, setLocation] = useState('');
  const [searching, setSearching] = useState(false);

  const mockHospitals = [
    {
      id: '1',
      name: 'City Endocrinology Center',
      address: '123 Medical Plaza, Downtown',
      phone: '(555) 123-4567',
      rating: 4.8,
      distance: '2.3 miles',
    },
    {
      id: '2',
      name: 'Regional Thyroid Clinic',
      address: '456 Health Street, Medical District',
      phone: '(555) 234-5678',
      rating: 4.6,
      distance: '3.1 miles',
    },
    {
      id: '3',
      name: 'University Hospital - Endocrine Department',
      address: '789 University Ave, Campus',
      phone: '(555) 345-6789',
      rating: 4.9,
      distance: '4.5 miles',
    },
  ];

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 1000);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          alert('Unable to retrieve your location. Please enter manually.');
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Nearby Hospitals & Specialists</h2>
        <p className="text-lg text-gray-600">
          Locate endocrinologists and thyroid specialists near you for consultation and treatment.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, ZIP code, or address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleUseLocation}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Navigation className="h-5 w-5" />
                Use My Location
              </button>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={searching}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center disabled:bg-gray-400"
            >
              <Search className="h-5 w-5" />
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-800">
          Note: For full Google Maps integration, you would need to add your Google Maps API key to the
          application. This demo shows sample hospitals in your area.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Nearby Specialists</h3>
        {mockHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{hospital.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-gray-700">{hospital.rating}</span>
                  <span className="text-gray-500 ml-2">{hospital.distance}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{hospital.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{hospital.phone}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Directions
              </button>
              <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
