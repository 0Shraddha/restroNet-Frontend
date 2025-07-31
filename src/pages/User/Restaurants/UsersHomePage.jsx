import React, { useState,useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import { Search, Heart, Star, MapPin, Clock } from 'lucide-react';
import Footer from '../Layout/Footer'
import {useGetRestaurantsQuery} from '../../../state/restaurants/restuarantApiSlice'
import { toast } from 'react-toastify';

const RestaurantRecommendationUI = () => {
const { data: restaurants, isLoading, isSuccess, isError, error } = useGetRestaurantsQuery();
console.log({restaurants});

 useEffect(() => {

  if (isError) {
    toast.error(`Failed to fetch restaurant details: ${error?.message || 'Unknown error'}`);
  }
}, [isSuccess, isError, error]);

  const featuredRestaurants = [
    {
      id: 1,
      name: 'Fresh Garden Bistro',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      rating: 4.8,
      cuisine: 'Mediterranean',
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      offer: '20% OFF',
      description: 'Fresh organic ingredients with authentic Mediterranean flavors'
    },
    {
      id: 2,
      name: 'Spice Route Kitchen',
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
      rating: 4.6,
      cuisine: 'Indian',
      deliveryTime: '30-40 min',
      distance: '2.1 km',
      offer: 'Free Delivery',
      description: 'Authentic Indian spices and traditional cooking methods'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Banner */}
          <div className="lg:col-span-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Active Summer With<br />
                <span className="text-orange-500">Fresh Recommendations</span>
              </h1>
              <p className="text-gray-600 mb-6">
                Discover the best restaurants in your area with our curated recommendations
              </p>
              <button className="bg-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition-colors">
                Explore Now
              </button>
            </div>
            <div className="absolute right-4 top-4 w-32 h-32 opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </main>

      <div className='px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between'>

        <div className="filter_container col-4">
          <div className="filter_options">
            <ul>
              <li>Cusine</li>
              <li>Location</li>
              <li>Price</li>
              <li>Ambiance</li>


            </ul>
          </div>
        </div>
        <div className="restro_container col">
          {/* Featured Restaurants */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
              <button className="text-orange-500 hover:text-orange-600 font-medium">View All →</button>
            </div>
            
           {isLoading && <p>Loading restaurants...</p>}

            {isSuccess && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {restaurants?.data?.map((restaurant) => (
                  <div key={restaurant._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="relative">
                      <img
                        src='../../../assets/restro.png'
                        alt={restaurant.restaurant_name}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="absolute top-3 left-3 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {restaurant.offer || "No Offer"}
                      </div>
                      <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{restaurant.restaurant_name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{restaurant.rating || "3.5"}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{restaurant.deliveryTime || '30min'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{restaurant.distance || '5.5km'}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{restaurant.cuisine}</span>
                          <button className="bg-orange-400 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors">
                            View Menu
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Discover restaurants near you
          </h2>
          <p className="text-gray-600 mb-6">
            Get personalized recommendations based on your location and preferences
          </p>
          <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
            Enable Location
          </button>
        </div>
      </div>

      {/* Footer */}
     <Footer />
    </div>
   
  );
};

export default RestaurantRecommendationUI;