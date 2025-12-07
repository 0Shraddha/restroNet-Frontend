// import React, { useState } from "react";
// import RestaurantTopCard from "../Restaurant/RestaurantTopCard";
// import RestaurantTableList from "../Restaurant/RestaurantTableList";
// import StatsCard from "../../components/StatsCard";
// import { Star, Tag } from "lucide-react";

// const Dashboard = () => {
//   const [activeItem, setActiveItem] = useState("Dashboard");

//     return (
//         <div className="mx-auto p-6 space-y-10">


//             <RestaurantTableList />
//         </div>
//     );
// }

// export default Dashboard;

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Star, MapPin, Users, TrendingUp, ChefHat, Clock, BarChart3 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GoogleMapComponent from '../../components/Map';
import { useGetRestaurantsQuery } from '../../state/restaurants/restuarantApiSlice';



// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Dummy Data
const dummyRestaurants = [
  { id: 1, name: "Spice Garden", rating: 4.8, reviews: 245, cuisine: "Indian", lat: 27.7172, lng: 85.3240, city: "Kathmandu", status: "active" },
  { id: 2, name: "Pasta Paradise", rating: 4.7, reviews: 189, cuisine: "Italian", lat: 27.7089, lng: 85.3206, city: "Kathmandu", status: "active" },
  { id: 3, name: "Sushi Master", rating: 4.9, reviews: 312, cuisine: "Japanese", lat: 27.7025, lng: 85.3156, city: "Lalitpur", status: "active" },
  { id: 4, name: "Burger Hub", rating: 4.5, reviews: 156, cuisine: "American", lat: 27.6915, lng: 85.3347, city: "Lalitpur", status: "active" },
  { id: 5, name: "Thai Delight", rating: 4.6, reviews: 201, cuisine: "Thai", lat: 27.7230, lng: 85.3102, city: "Kathmandu", status: "active" },
  { id: 6, name: "Dragon Wok", rating: 4.4, reviews: 178, cuisine: "Chinese", lat: 27.6893, lng: 85.3201, city: "Bhaktapur", status: "active" },
  { id: 7, name: "Mediterranean Breeze", rating: 4.7, reviews: 167, cuisine: "Mediterranean", lat: 27.7142, lng: 85.3089, city: "Kathmandu", status: "active" },
  { id: 8, name: "Taco Fiesta", rating: 4.3, reviews: 134, cuisine: "Mexican", lat: 27.6945, lng: 85.3289, city: "Lalitpur", status: "pending" },
];

const cuisineData = [
  { name: "Indian", count: 1, color: "#ef4444" },
  { name: "Italian", count: 1, color: "#f97316" },
  { name: "Japanese", count: 1, color: "#eab308" },
  { name: "American", count: 1, color: "#22c55e" },
  { name: "Thai", count: 1, color: "#3b82f6" },
  { name: "Chinese", count: 1, color: "#8b5cf6" },
  { name: "Mexican", count: 1, color: "#f43f5e" },
];

const growthData = [
  { month: "Jul", restaurants: 3 },
  { month: "Aug", restaurants: 5 },
  { month: "Sep", restaurants: 4 },
  { month: "Oct", restaurants: 7 },
  { month: "Nov", restaurants: 6 },
  { month: "Dec", restaurants: 8 },
];

const Dashboard = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

 const { data: restaurants, isLoading } = useGetRestaurantsQuery();
  console.log({restaurants});

  const activeRestaurants = dummyRestaurants.filter(r => r.status === 'active');
  const pendingRestaurants = dummyRestaurants.filter(r => r.status === 'pending');
  const topRated = [...activeRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const avgRating = (activeRestaurants.reduce((acc, r) => acc + r.rating, 0) / activeRestaurants.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg rounded-3xl m-4">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Restaurant Platform Dashboard</h1>
          <p className="text-red-100 mt-1">Super Admin Panel</p>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Restaurants"
            value={"0"}
            subtitle={`No. of active restaurants`}
            color="border-red-500"
            onClick={() => navigate('restaurant-list')}
          />
          <StatCard
            icon={Clock}
            title="High Rated Restaurants"
            value={pendingRestaurants.length}
            subtitle="Awaiting approval"
            color="border-orange-500"
            onClick={() => setActiveTab('pending')}
          />
          <StatCard
            icon={Star}
            title="Average Rating"
            value={avgRating}
            subtitle="Platform-wide"
            color="border-yellow-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Top Rated"
            value={topRated[0]?.rating}
            subtitle={topRated[0]?.name}
            color="border-green-500"
            onClick={() => setSelectedRestaurant(topRated[0])}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Rated Restaurants */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Star className="w-5 h-5 text-red-500 mr-2" />
              Top Rated Restaurants
            </h2>
            <div className="space-y-3">
              {topRated.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="flex items-center justify-between p-3 hover:bg-red-50 rounded-lg cursor-pointer transition-colors border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 text-red-600 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{restaurant.name}</p>
                      <p className="text-xs text-gray-500">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-800">{restaurant.rating}</span>
                    <span className="text-xs text-gray-400">({restaurant.reviews})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cuisine Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ChefHat className="w-5 h-5 text-red-500 mr-2" />
              Restaurants by Cuisine
            </h2>
            <div className="space-y-3">
              {cuisineData.map((cuisine) => (
                <div
                  key={cuisine.name}
                  onClick={() => setSelectedCuisine(cuisine.name)}
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{cuisine.name}</span>
                    <span className="text-sm font-semibold text-gray-800">{cuisine.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(cuisine.count / dummyRestaurants.length) * 100}%`,
                        backgroundColor: cuisine.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Restaurant Growth Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 text-red-500 mr-2" />
              Restaurant Growth
            </h2>
            <p className="text-sm text-gray-500 mb-4">New registrations</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="restaurants" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 text-red-500 mr-2" />
            Restaurant Locations
          </h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <GoogleMapComponent
                restaurants={restaurants?.data || []} 
            />
          
          </div>
        </div>

        {/* Selected Restaurant Modal */}
        {selectedRestaurant && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRestaurant(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedRestaurant.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cuisine:</span>
                  <span className="font-semibold text-gray-800">{selectedRestaurant.cuisine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-800">{selectedRestaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-semibold text-gray-800">{selectedRestaurant.reviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-800">{selectedRestaurant.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedRestaurant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedRestaurant.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;