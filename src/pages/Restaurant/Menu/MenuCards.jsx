import React, { useState } from "react";
import { Star, Clock, Flame, ChefHat, Edit2, Trash2,X } from "lucide-react";
import { useGetCategoriesQuery } from "../../../state/restaurants/categoryApiSlice";

const MenuCards = ({ menu, currency = "Rs", onEdit, onDelete, isAdmin = false }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories } = useGetCategoriesQuery();

  // --- FILTER MENU ---
  const filteredMenu = menu?.data?.filter((item) => {
    // Make category comparison case-insensitive
    const itemCategory = item?.category?.toString().toLowerCase();
    const selectedCat = selectedCategory.toString().toLowerCase();

    const matchesCategory = selectedCategory === "all" || itemCategory === selectedCat;

    const matchesSearch =
      searchQuery === "" ||
      item?.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleEdit = (id) => {
    if (onEdit) onEdit(id);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" bg-red-100 border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto py-6 flex">
          <div className="me-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Our Menu</h1>
            <p className="text-gray-600 mb-4 text-nowrap">Explore our delicious selection</p>
          </div>
          {/* Search */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>


          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 ps-18 scrollbar-hide">
            <button
            type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            {categories?.data?.map((cat) => (
              <button
                key={cat?._id}
                type="button"
                onClick={() => setSelectedCategory(cat?.label)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap capitalize ${
                  selectedCategory === cat?.label
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat?.label}
              </button>
            ))}
          </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <p className="text-sm text-gray-600 mb-4">
          Showing <span className="font-semibold text-gray-900">{filteredMenu?.length || 0}</span> items
          {selectedCategory !== "all" && (
            <span> in <span className="font-semibold text-red-600">{selectedCategory}</span></span>
          )}
        </p>

        {/* Menu List */}
        <div className="space-y-4">
          {filteredMenu?.map((item) => {
            const unavailable = item?.availability === false;
            return (
              <div
                key={item?._id}
                className={`bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  unavailable ? "opacity-70" : ""
                }`}
              >
                {/* Left Info */}
                <div className="flex flex-col gap-1">
                  <h3 className={`font-bold text-lg ${unavailable ? "text-gray-400" : "text-gray-900"}`}>
                    {item?.item_name}
                  </h3>
                  {item?.category && (
                    <span className="text-xs text-red-600 font-semibold capitalize">{item?.category}</span>
                  )}
                  <p className="text-gray-600 text-sm">{item?.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <Clock size={14} /> <span>{item?.preparation_time}m</span>
                    {item?.spice_level > 0 && (
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(item?.spice_level, 3) }).map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-red-500" fill="currentColor" />
                        ))}
                      </div>
                    )}
                    <Star size={14} className="text-yellow-500" />{" "}
                    <span>{item?.ratings || "4.5"}</span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex gap-2 mt-2 md:mt-0">
                  <div className="bg-gray-50 rounded-full px-4 py-2 font-semibold text-red-600">
                    {currency} {item?.price}
                  </div>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleEdit(item?._id)}
                        className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredMenu?.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
                <ChefHat className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No items found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different search.`
                    : "Check back later for delicious options!"}
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCards;
