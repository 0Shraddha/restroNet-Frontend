import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Flame, Star, Clock, Trash2, ChefHat } from "lucide-react";


const MenuCards = ({ menu, currency = "Rs" }) => {
    const navigate = useNavigate();
  
  const handleEdit = (id) => {
		navigate(`/menu-manager?id=${id}`);
	};


	const handleDelete = (id) => {
		console.log("deleting : ", id);
	};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {menu?.data?.map((item) => {
        const unavailable = item.availability === false;

      return (
          <div
            key={item._id}
            className={`group relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
              unavailable
                ? "border-gray-200 opacity-75"
                : "border-orange-100 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
              <img
                src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400`}
                alt={item.item_name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  unavailable ? "grayscale" : "group-hover:scale-110"
                }`}
              />
              
              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                    unavailable
                      ? "bg-red-500/90 text-white"
                      : "bg-emerald-500/90 text-white"
                  }`}
                >
                  {unavailable ? "Unavailable" : "Available"}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-orange-600 font-bold text-lg">
                    {currency} {item.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">
                {item.item_name || "Untitled"}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                {item.description?.trim() || "No description available"}
              </p>

              {/* Quick Info Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium">
                  <Clock size={14} />
                  <span>{item.preparation_time ?? 0} min</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-medium">
                  {Array.from({ length: item.spice_level ?? 0 }).map((_, i) => (
                    <Flame key={i} className="w-4 h-4 text-red-500" />
                  ))}

                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-medium">
                  <Star size={14} fill="currentColor" />
                  <span>{item.ratings ?? 0}</span>
                </div>
              </div>

              {/* Tags */}
              {/* {item?.tas?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.category.slice(0, 3).map((cat, i) => (
                    <span
                      key={`cat-${item._id}-${i}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
            
                </div>
              )} */}

              {/* Ingredients */}
              {item?.ingredients?.length > 0 && (
                <div className="mb-4">
                      
                  <p className="flex gap-1 items-center text-xs font-semibold text-gray-500 mb-2"><ChefHat size={12} />INGREDIENTS </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.slice(0, 4).map((ing, i) => (
                      <span
                        key={`ing-${item._id}-${i}`}
                        className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 4 && (
                      <span className="px-2.5 py-1 text-xs text-gray-500 font-medium">
                        +{item.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleEdit(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium text-sm transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            {/* Unavailable Overlay */}
            {unavailable && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 pointer-events-none" />
            )}




            
          </div>
        );
      })}
    </div>
  );
};

export default MenuCards;
