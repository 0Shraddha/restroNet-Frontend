import React from "react";
import { Search, MapPin, Clock, Star, Filter, ChevronDown, Menu, X, Phone } from 'lucide-react';
import { Link } from "react-router-dom";

const RestaurantCard = ({restaurant}) => {  
    return (

    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
      <Link to={ `/restaurant/?id=${restaurant._id}`}>
      <div className="relative h-48 overflow-hidden">
        
        <img
          src={restaurant.images[0]}
          alt={restaurant.restaurant_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center shadow-md">
          <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-semibold text-sm">{restaurant.rating || 0}</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.restaurant_name}</h3>
        <span className="text-gray-700 text-md leading-5 min-h-[40px] line-clamp-2">{restaurant.description}</span>
        
        <div className="flex items-center text-gray-600 text-sm my-2">
          <MapPin size={16} className="mr-2 text-orange-600" />
          <span>{restaurant.restaurant_location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Clock size={16} className="mr-2 text-orange-600" />
          <span>{restaurant.hours || '00:00'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Phone size={16} className="mr-2 text-orange-600" />
            <span>{restaurant.restaurant_contact}</span>
          </div>
          <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
            View Details →
          </button>
        </div>
      </div>
      </Link>
    </div>

    )
}

export default RestaurantCard;