import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';

const RestaurantList = () => {
  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Restaurant List</h2>
        <Link to="/add-restaurant">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition pointer">
            + Add New Restaurant
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="w-100 flex items-center gap-2">
      <Search size={24}/> <Input
          type='text'
          name='search'
          className='bg-white'
          placeholder='Search...'
        />
      </div> 

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-3">Logo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Cuisine</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            <tr className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="logo"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="p-3 font-medium">La Pinoz Pizza</td>
              <td className="p-3">lapinoz@example.com</td>
              <td className="p-3">9800000000</td>
              <td className="p-3">Italian</td>
              <td className="p-3">
                <Link
                  to="/restaurant-detail/${restaurant.id}"
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="logo"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="p-3 font-medium">La Pinoz Pizza</td>
              <td className="p-3">lapinoz@example.com</td>
              <td className="p-3">9800000000</td>
              <td className="p-3">Italian</td>
              <td className="p-3">
                <Link
                  to="/restaurant-detail/${restaurant.id}"
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
            {/* More rows can go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantList;
