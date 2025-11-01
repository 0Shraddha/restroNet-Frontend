import React, { useState } from "react";
import { Search, Star, MapPin, Phone, Clock, DollarSign, Filter } from "lucide-react";
import { useGetRestaurantsQuery } from "../../state/restaurants/restuarantApiSlice";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const RestaurantTableList = () => {

    const { data: restaurants, isLoading, isSuccess, isError, error } = useGetRestaurantsQuery();
    // console.log({restaurants});


    return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">Restaurant Directory</h2>
                    <p className="text-blue-100">Discover the best dining experiences in Nepal</p>
                </div>
                {/* Restaurant Table */}
                <table>
                    <thead>
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Cuisine</th>   
                            <th  className="px-6 py-4 text-left text-sm font-medium text-gray-900">Manage Menu</th>
                        </tr>
                    
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {restaurants && restaurants.data.map((restaurant,index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{restaurant.restaurant_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{restaurant.restaurant_location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{restaurant.restaurant_contact || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{restaurant.cuisine || "Various"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                     <Link to="/menu-manager">
                                     <Button className="w-full border-1 border-orange-400 text-orange-600 py-2 px-4 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 cursor-pointer">
                                        Manage
                                     </Button>
               
                                     </Link> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-sm text-gray-600">
                        {/* Showing {filteredAndSortedRestaurants.length} of {restaurants.length} restaurants */}
                    </p>
                </div>
            </div>
    );
};

export default RestaurantTableList;