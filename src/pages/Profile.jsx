import React, { useState } from 'react';
import { User, MapPin, Clock, Utensils, Heart, ChevronRight, ChevronLeft, Mail, Phone } from 'lucide-react';
import Modal from '../components/common/Modal'
import GetPreferences from './User/Preference/GetPreferenceForm'

export default function RestaurantProfile() {
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState({
    cuisines: ['Italian', 'Japanese', 'Mexican'],
    distance: '5',
    category: ['Dinner', 'Lunch'],
    tags: ['Casual', 'Family-Friendly']
  });

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    console.log('Saved preferences:', newPreferences);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/consumer";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SHRADDHA DONGOL</h1>
                <div className="text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 me-2" />
                  <span>shraddhadongol12345@gmail.com</span>
                </div>
                <div className="text-gray-600 flex items-center mt-1">
                  <Phone className="w-4 h-4 me-2" />
                  <span>9800000012</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Preferences Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Preferences</h2>
          
          <div className="space-y-6">
            {/* Cuisines */}
            {preferences.cuisines && preferences.cuisines.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Utensils className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Favorite Cuisines</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.cuisines.map(cuisine => (
                      <span key={cuisine} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Distance */}
            {preferences.distance && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Maximum Distance</h3>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                    {preferences.distance} km
                  </span>
                </div>
              </div>
            )}

            {/* Meal Times */}
            {preferences.category && preferences.category.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Preferred Meal Times</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.category.map(time => (
                      <span key={time} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Atmosphere */}
            {preferences.tags && preferences.tags.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Atmosphere Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowPreferencesModal(true)}
            className="mt-8 w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            Update Preferences
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

   			{showPreferencesModal && (
				<Modal onClose={() => setShowPreferencesModal(false)}>
					<GetPreferences onClose={() => setShowPreferencesModal(false)} />
				</Modal>
			)}

    </div>
  );
}