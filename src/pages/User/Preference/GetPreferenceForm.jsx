import { useState } from 'react';
import { ChefHat, MapPin, Utensils, Heart, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GetPreferences({ onClose, onSavePreferences }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);


  const [preferences, setPreferences] = useState({
    cuisines: [],
    distance: '',
    category: [],
    tags: []
  });

  const cuisineOptions = [
    'Italian', 'Chinese', 'Japanese', 'Mexican', 'Indian', 'Nepalese', 
    'Thai', 'Mediterranean', 'American', 'Korean', 'French',
    'Vietnamese', 'Spanish', 'Middle Eastern'
  ];

  const distanceOptions = [
    { label: '1 km', value: '1' },
    { label: '3 km', value: '3' },
    { label: '5 km', value: '5' },
    { label: '10+ km', value: '10' }
  ];

  const mealOptions = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Late Night'];

  const atmosphereOptions = [
    'Casual', 'Romantic', 'Family-Friendly', 'Quiet', 
    'Lively', 'Outdoor Seating', 'Bar/Lounge', 'Fine Dining'
  ];

  const toggleSelection = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSubmit = () => {
    console.log('User preferences:', preferences);
    alert('Preferences saved! Ready to find amazing restaurants for you.');
    navigate('/users');

    
  if (onSavePreferences) {
    onSavePreferences(preferences); // send preferences back to parent
  }

  if (onClose) {
    onClose(); // close the modal
  }
    
  };

  const isStepComplete = () => {
    switch(step) {
      case 1: return preferences.cuisines.length > 0;
      case 2: return true; // Distance is optional
      case 3: return preferences.category.length > 0;
      case 4: return preferences.tags.length > 0;
      default: return false;
    }
  };

  return (
    <div className={onSavePreferences ? `w-full` : `min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4`}>
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500 p-4 rounded-full">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome! Let's personalize your experience
          </h1>
          <p className="text-gray-600">
            Tell us what you love, and we'll recommend the perfect restaurants for you
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`w-full h-2 mx-1 rounded-full transition-all ${
                  s <= step ? 'bg-red-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">Step {step} of 4</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Step 1: Cuisines */}
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <Utensils className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  What cuisines do you enjoy?
                </h2>
              </div>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cuisineOptions.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => toggleSelection('cuisines', cuisine)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      preferences.cuisines.includes(cuisine)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {preferences.cuisines.includes(cuisine) && (
                      <Check className="w-4 h-4 inline mr-1" />
                    )}
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Distance */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  How far are you willing to travel?
                </h2>
              </div>
              <p className="text-gray-600 mb-6">Choose your preferred distance (optional)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {distanceOptions.map(dist => (
                  <button
                    key={dist.value}
                    onClick={() => setPreferences(prev => ({ ...prev, distance: dist.value }))}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      preferences.distance === dist.value
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="text-xl font-bold">{dist.label}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(3)}
                className="mt-6 text-red-500 hover:text-red-600"
              >
                Skip this step →
              </button>
            </div>
          )}

          {/* Step 3: Meal Times */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  When do you usually dine out?
                </h2>
              </div>
              <p className="text-gray-600 mb-6">Select your preferred meal times</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mealOptions.map(meal => (
                  <button
                    key={meal}
                    onClick={() => toggleSelection('category', meal)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      preferences.category.includes(meal)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {preferences.category.includes(meal) && (
                      <Check className="w-5 h-5 inline mr-2" />
                    )}
                    <span className="font-semibold">{meal}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Atmosphere */}
          {step === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  What atmosphere do you prefer?
                </h2>
              </div>
              <p className="text-gray-600 mb-6">Select your favorite vibes</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {atmosphereOptions.map(atm => (
                  <button
                    key={atm}
                    onClick={() => toggleSelection('tags', atm)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      preferences.tags.includes(atm)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {preferences.tags.includes(atm) && (
                      <Check className="w-4 h-4 inline mr-1" />
                    )}
                    {atm}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Back
          </button>
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!isStepComplete()}
              className="px-8 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepComplete()}
              className="px-8 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}