import React, { useState } from 'react';
import { Search, MapPin, Clock, Star, Filter, ChevronDown, Menu, X } from 'lucide-react';
import HeroBanner from './HeroBanner'
import GoogleMapComponent from '../../../components/Map';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">FoodFinder</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition">Explore</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition">About</a>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition">
              Sign In
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#" className="block text-gray-700 hover:text-orange-600">Home</a>
            <a href="#" className="block text-gray-700 hover:text-orange-600">Explore</a>
            <a href="#" className="block text-gray-700 hover:text-orange-600">About</a>
            <button className="w-full bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const FiltersComponent = () => {
  const [openFilter, setOpenFilter] = useState('cuisine');

  const filters = {
    cuisine: ['Italian', 'Chinese', 'Indian', 'Japanese', 'Mexican'],
    price: ['$', '$$', '$$$', '$$$$'],
    rating: ['4+ Stars', '3+ Stars', 'All'],
    distance: ['< 1 km', '< 5 km', '< 10 km', 'Any']
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <Filter size={20} className="text-gray-600" />
      </div>

      {Object.keys(filters).map((filterKey) => (
        <div key={filterKey} className="mb-6">
          <button
            onClick={() => setOpenFilter(openFilter === filterKey ? null : filterKey)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="font-semibold text-gray-700 capitalize">{filterKey}</span>
            <ChevronDown 
              size={18} 
              className={`transition-transform ${openFilter === filterKey ? 'rotate-180' : ''}`}
            />
          </button>
          
          {openFilter === filterKey && (
            <div className="space-y-2 pl-2">
              {filters[filterKey].map((option) => (
                <label key={option} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input type="checkbox" className="mr-3 accent-orange-600" />
                  <span className="text-gray-600 text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition mt-4">
        Clear All
      </button>
    </div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center shadow-md">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-semibold text-sm">{restaurant.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-2 text-orange-600" />
          <span>{restaurant.address}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Clock size={16} className="mr-2 text-orange-600" />
          <span>{restaurant.hours}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-orange-600 font-semibold">{restaurant.price}</span>
          <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

const UsersHomePage = () => {
  const mockRestaurants = [
    {
      name: "Mezze by Roadhouse",
      address: "Durbar Marg, Kathmandu",
      hours: "11 AM - 10 PM",
      image: "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg",
      rating: "4.5",
      price: "$$"
    },
    {
      name: "Bota Donuts",
      address: "New Road, Kathmandu",
      hours: "9 AM - 8 PM",
      image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      rating: "4.8",
      price: "$"
    },
    {
      name: "Vesper Cafe",
      address: "Jhamsikhel, Lalitpur",
      hours: "8 AM - 9 PM",
      image: "https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg",
      rating: "4.6",
      price: "$$"
    },
    {
      name: "Fire & Ice Pizzeria",
      address: "Thamel, Kathmandu",
      hours: "12 PM - 10 PM",
      image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
      rating: "4.7",
      price: "$$"
    },
    {
      name: "Bajeko Sekuwa",
      address: "Pulchowk, Lalitpur",
      hours: "11 AM - 9 PM",
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
      rating: "4.4",
      price: "$"
    },
    {
      name: "Krishnarpan Restaurant",
      address: "Patan, Lalitpur",
      hours: "6 PM - 10 PM",
      image: "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg",
      rating: "4.9",
      price: "$$$$"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main>
        <HeroBanner />
      </main>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
<GoogleMapComponent
          restaurants={[
            {
              name: "Mezze by Roadhouse",
              lat: 27.7123,
              lng: 85.3123,
              address: "Durbar Marg, Kathmandu",
              hours: "11 AM - 10 PM",
              image: "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg"
            },
            {
              name: "Bota Donuts",
              lat: 27.7140,
              lng: 85.3188,
              address: "New Road, Kathmandu",
              hours: "9 AM - 8 PM",
              image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200"
            },
            {
              name: "Vesper Cafe",
              lat: 27.7192,
              lng: 85.3274,
              address: "Jhamsikhel, Lalitpur",
              hours: "8 AM - 9 PM",
              image: "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg"
            }
          ]}
      />        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <FiltersComponent />
          </div>
          
          <div className="col-span-12 lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Popular Restaurants
              </h2>
              <span className="text-gray-600">{mockRestaurants.length} results</span>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              {mockRestaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 FoodFinder. Discover the best restaurants in Kathmandu.</p>
        </div>
      </footer>
    </div>
  );
};

export default UsersHomePage;