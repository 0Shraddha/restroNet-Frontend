import React from "react";
import { Search, MapPin, Clock, Star, Filter, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

const RestaurantCard = ({restaurant}) => {
    return (

    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <Link to="/restaurant/1">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        </Link>
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

    )
}

export default RestaurantCard;