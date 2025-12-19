import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Store, Globe, MapPin, Calendar, DollarSign, Users, Eye } from 'lucide-react';
import { useGetRestaurantsQuery } from '../../state/restaurants/restuarantApiSlice';
import GoogleMapComponent from '../../components/Map';
import RestaurantGallery from '../../components/common/RestaurantGallery';

const RestaurantDashboard = () => {
  const {data:restaurantData} = useGetRestaurantsQuery();
console.log({restaurantData});

  // Calculate statistics
const stats = useMemo(() => {
  if (!restaurantData?.data) {
    return {
      totalRestaurants: 0,
      uniqueCuisines: 0,
      cuisineCount: {},
      priceRangeCount: {},
      validLocations: 0,
      timeline: {},
    };
  }

  const totalRestaurants = restaurantData.data.length;

  const cuisineCount = {};
  restaurantData.data.forEach(r => {
    r.cuisine.forEach(c => {
      cuisineCount[c] = (cuisineCount[c] || 0) + 1;
    });
  });

  const uniqueCuisines = Object.keys(cuisineCount).length;

  const priceRangeCount = {};
  restaurantData.data.forEach(r => {
    priceRangeCount[r.priceRange] =
      (priceRangeCount[r.priceRange] || 0) + 1;
  });

  const validLocations = restaurantData.data.filter(
    r =>
      r.location?.coordinates?.[0] &&
      r.location?.coordinates?.[1]
  ).length;

  const timeline = {};
  restaurantData.data.forEach(r => {
    const date = new Date(r.createdAt).toLocaleDateString();
    timeline[date] = (timeline[date] || 0) + 1;
  });

  return {
    totalRestaurants,
    uniqueCuisines,
    cuisineCount,
    priceRangeCount,
    validLocations,
    timeline,
  };
}, [restaurantData]);

  const allImages = useMemo(() => {
    if (!restaurantData?.data) return [];

    return restaurantData.data
      .flatMap(r => r.images || [])
      .slice(0, 10); // limit for dashboard
  }, [restaurantData]);

  // Prepare chart data
  const cuisineChartData = Object.entries(stats.cuisineCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const timelineData = Object.entries(stats.timeline)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const priceRangeData = Object.entries(stats.priceRangeCount)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#3ab6fdff', '#ffa600ff', '#f87171', '#fca5a5', '#fb693cff', '#fbbf24', '#facc15', '#a3e635'];
  

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-8xl mx-auto mb-5 bg-gradient-to-r from-red-500 to-red-600 text-white font-['poppins'] rounded-xl ">
        <div className="px-6 pt-4 pb-12 relative">
          <h1 className="text-3xl font-semibold">Restaurant Management Dashboard</h1>
          <p className="text-[#001F3D] bg-gray-100 font-medium font-['lilex'] text-sm mt-1 absolute bottom-0 left-0 rounded-b-lg w-full px-6 py-2">Admin Panel</p>
        </div>
      </header>

      <div className="max-w-8xl mx-auto">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Store}
            title="Total Restaurants"
            value={stats.totalRestaurants}
            subtitle="Active listings"
            color="text-red-600"
          />
          <StatCard
            icon={Globe}
            title="Unique Cuisines"
            value={stats.uniqueCuisines}
            subtitle="Types available"
            color="text-red-600"
          />
          <StatCard
            icon={MapPin}
            title="Valid Locations"
            value={stats.validLocations}
            subtitle="Mapped restaurants"
            color="text-red-600"
          />
          <StatCard
            icon={Calendar}
            title="Recent Additions"
            value={Object.keys(stats.timeline).length}
            subtitle="Registration days"
            color="text-red-600"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
           {/* Top Cuisines Pie */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 ">Top 5 Cuisines</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cuisineChartData.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cuisineChartData.slice(0, 5).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Registration Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 ">Registration Timeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#27bd09ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1  mb-6">
         {/* Cuisine Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 ">Restaurants by Cuisine</h3>
            <ResponsiveContainer width="100%" height={300}>
  <LineChart data={cuisineChartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="name"
      angle={-45}
      textAnchor="end"
      height={80}
    />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#dc2626"
      strokeWidth={3}
      dot={{ r: 5, fill: "#dc2626" }}
      activeDot={{ r: 7 }}
    />
  </LineChart>
</ResponsiveContainer>

          </div>

        </div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
  <div className="flex items-center justify-between mb-5">
    <h3 className="text-xl font-bold text-gray-800 mb-4 ">
      Restaurant Gallery Showcase
    </h3>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
    {restaurantData?.data?.slice(0, 5).map((restaurant) => (
      <div
        key={restaurant._id}
        className="group relative rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
      >
        {/* Image */}
        {restaurant.images?.length > 0 ? (
          <img
            src={restaurant.images[0]}
            alt={restaurant.restaurant_name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-gray-400">
            <ImageIcon size={40} />
          </div>
        )}

        {/* Image count badge */}
        <div className="absolute top-3 right-3 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full shadow">
          {restaurant.images?.length || 0} photos
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-semibold text-sm truncate mb-2">
            {restaurant.restaurant_name}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Restaurant List Table
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 ">Recent Restaurants</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuisines
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurantData?.data.map((restaurant) => (
                  <tr key={restaurant._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{restaurant.restaurant_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {restaurant.cuisine.map((c, i) => (
                          <span key={i} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded capitalize">
                        {restaurant.priceRange}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(restaurant.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        {/* Map Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 text-red-500 mr-2" />
            Restaurant Locations
          </h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <GoogleMapComponent
                restaurants={restaurantData?.data || []} 
            />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;