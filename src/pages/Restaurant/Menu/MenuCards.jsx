import React, { useState } from "react";
import { Star, Clock, Flame, ChefHat, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuCards = ({ menu, currency = "Rs" }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Extract unique categories (if you have category field)
  const categories = ["all", ...new Set(menu?.data?.map(item => item?.category).filter(Boolean))];

  const filteredMenu = selectedCategory === "all" 
    ? menu?.data 
    : menu?.data?.filter(item => item?.category === selectedCategory);

  const handleEdit = (id) => {
		navigate(`/menu-manager?id=${id}`);
	};


	const handleDelete = (id) => {
		console.log("deleting : ", id);
	};

  return (
    <div className="px-4 pb-8 pt-3">

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu?.map((item) => {
          const unavailable = item?.availability === false;
          console.log(item?.ingredients, "innnnnnnnnnnnniiiiiiiiiiiiii")
          return (
            <div
              key={item?._id}
              className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                unavailable
                  ? "border-gray-200 opacity-70"
                  : "border-gray-100 hover:border-red-200 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item?.images || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"}
                  alt={item?.item_name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    unavailable ? "grayscale" : "group-hover:scale-110"
                  }`}
                />

                {/* Availability Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold shadow-lg ${
                      unavailable
                        ? "bg-red-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {unavailable ? "Unavailable" : "Available"}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-red-600 font-bold text-lg">
                      {currency} {item?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
                  {item?.item_name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {item?.description || "Delicious dish prepared with care"}
                </p>

                {/* Tags Row */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Prep Time */}
                  <div className="flex items-center gap-1 text-blue-600">
                    <Clock size={14} />
                    <span className="text-xs font-medium">{item?.preparation_time}m</span>
                  </div>

                  {/* Spice Level */}
                  {item?.spice_level > 0 && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(item?.spice_level, 3) }).map((_, i) => (
                        <Flame key={i} className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
                      ))}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-500 ml-auto">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-medium text-gray-700">
                      {item?.ratings || "4.5"}
                    </span>
                  </div>
                </div>

                {/* Ingredients */}
                {item?.ingredients?.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 mb-2">
                      <ChefHat size={12} className="text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Ingredients
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item?.ingredients?.slice(0, 3)?.map((ing, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-50 text-xs rounded-md text-gray-600"
                        >
                          {ing}
                        </span>
                      ))}
                      {item?.ingredients?.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{item?.ingredients?.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                 {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
               type="button"
               onClick={() => handleEdit(item?._id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium"
              >
              <Edit2 size={16} />
                Edit
              </button>

              <button
               type="button"
               onClick={() => handleDelete(item?._id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {(!filteredMenu || filteredMenu.length === 0) && (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
          <p className="text-gray-500">Check back later for delicious options!</p>
        </div>
      )}
    </div>
  );
};

export default MenuCards;