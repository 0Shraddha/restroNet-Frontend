import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Plus, Tag, Star } from 'lucide-react';
import RestaurantTableList from './RestaurantTableList';
import StatsCard from '../../components/StatsCard';

const RestaurantList = () => {
   const cardsData = [
        {
            heading: "Total Restaurants", 
            total: 45, 
            icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>,
                color:"gray"

        },
        { heading: "Top Rated", total: 14, icon: <Star className="w-6 h-6 text-yellow-600" />, color:"yellow" },
        { heading: "Total Cuisisne", total: 35, icon: <Tag className="w-6 h-6 text-red-600" />, color:"purple" },
        { heading: "Active", 
            total: 40, 
            icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>,
            color:"green"}


    ];

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
    <div className="mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Management</h1>
            <p className="text-gray-600">Manage your restaurant listings and details</p>
          </div>
          <Link to="/add-restaurant">
            <button className="bg-gradient-to-r from-red-500 to-red-400 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
              <Plus size={20} />
              Add New Restaurant
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      {/* <StatsCard cardsData={cardsData} /> */}

  
<RestaurantTableList />
     </div>
  );
};


export default RestaurantList;