import React, { useState } from 'react';
import { Search, User, Heart, Star, MapPin, Clock } from 'lucide-react';

const RestaurantRecommendationUI = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🍽️' },
    { id: 'fruits', name: 'Fruits & Vegetables', icon: '🍎' },
    { id: 'bakery', name: 'Bakery & Pastries', icon: '🥖' },
    { id: 'seafood', name: 'Fresh Seafood', icon: '🐟' },
    { id: 'meat', name: 'Meat & Poultry', icon: '🥩' },
    { id: 'beverages', name: 'Beverages & Drinks', icon: '🍹' },
    { id: 'organic', name: 'Organic & Natural', icon: '🌱' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
    { id: 'pantry', name: 'Pantry Essentials', icon: '🏺' }
  ];

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
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <span className="text-xl font-bold text-gray-900">RestroNet</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">All Categories</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Best Sellers</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Special Offers</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Fresh</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Brands</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Blog</a>
              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">Pages</a>
            </nav>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 p-1 text-gray-600 cursor-pointer bg-orange-100 rounded-xl hover:text-orange-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Banner */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
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

          {/* Side Banner */}
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">25% SALE OFF</h2>
              <p className="text-sm mb-4 opacity-90">
                Special deals<br />
                Just for you
              </p>
              <button className="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <button className="text-orange-500 hover:text-orange-600 font-medium">All Categories →</button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedCategory === category.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-900 text-center">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
            <button className="text-orange-500 hover:text-orange-600 font-medium">View All →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-3 left-3 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {restaurant.offer}
                  </div>
                  <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
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
        </div>

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
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <span className="text-xl font-bold">RestroNet</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for restaurant recommendations and food discovery.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fast Food</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fine Dining</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cafes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desserts</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@restronet.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RestroNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
   
  );
};

export default RestaurantRecommendationUI;