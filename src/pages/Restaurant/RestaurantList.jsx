import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Plus } from 'lucide-react';
import RestaurantTableList from './RestaurantTableList';
import StatsCard from '../../components/StatsCard';

const RestaurantList = () => {
  const handleViewDetails = (id) => {
    // Navigate to restaurant details
    console.log(`Viewing details for restaurant ${id}`);
  };

  const handleEdit = (id) => {
    // Navigate to edit restaurant
    console.log(`Editing restaurant ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      console.log(`Deleting restaurant ${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Management</h1>
            <p className="text-gray-600">Manage your restaurant listings and details</p>
          </div>
          <Link to="/add-restaurant">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
              <Plus size={20} />
              Add New Restaurant
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatsCard/>

  
<RestaurantTableList />
     </div>
  );
};


export default RestaurantList;