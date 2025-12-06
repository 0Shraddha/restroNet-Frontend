import React, { useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin, Search, Users, Calendar, Filter, ChevronDown } from "lucide-react";
import GoogleMapComponent from "../../../components/Map";
import { useGetRestaurantsQuery } from "../../../state/restaurants/restuarantApiSlice";
import { useNavigate } from "react-router-dom";


// Mock data for restaurants
// const restaurants = [
// 	{
// 		name: "Chop Chop",
// 		rating: 4.8,
// 		reviews: 20,
// 		cuisine: "Japanese",
// 		city: "Canberra City",
// 		tags: ["Peaceful", "Great Ambiance", "Delicious"],
// 		logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
// 		position: [-0.2202, -78.5127],
// 	},
// 	{
// 		name: "Flui Restaurant",
// 		rating: 4.9,
// 		reviews: 61,
// 		cuisine: "Modern Australian",
// 		city: "Canberra City",
// 		tags: ["Great Ambiance", "Delicious", "Dining"],
// 		logo: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
// 		position: [-0.225, -78.51],
// 	},
// 	{
// 		name: "Window pane Cafe and Restaurant",
// 		rating: 4.5,
// 		reviews: 55,
// 		cuisine: "Continental",
// 		city: "Canberra City",
// 		tags: ["Great Ambiance", "Delicious", "Dining"],
// 		logo: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
// 		position: [-0.225, -78.51],
// 	},
// ];

const FiltersComponent = () => {
	const [openFilter, setOpenFilter] = useState("cuisine");

	const filters = {
		cuisine: ["Italian", "Chinese", "Indian", "Japanese", "Mexican"],
		price: ["$", "$$", "$$$", "$$$$"],
		rating: ["4+ Stars", "3+ Stars", "All"],
		distance: ["< 1 km", "< 5 km", "< 10 km", "Any"],
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-sm h-full">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-bold text-gray-800">Filters</h3>
				<Filter size={20} className="text-gray-600" />
			</div>

			{Object.keys(filters).map((filterKey) => (
				<div key={filterKey} className="mb-6">
					<button
						onClick={() =>
							setOpenFilter(openFilter === filterKey ? null : filterKey)
						}
						className="flex items-center justify-between w-full text-left mb-3"
					>
						<span className="font-semibold text-gray-700 capitalize">
							{filterKey}
						</span>
						<ChevronDown
							size={18}
							className={`transition-transform ${
								openFilter === filterKey ? "rotate-180" : ""
							}`}
						/>
					</button>

					{openFilter === filterKey && (
						<div className="space-y-2 pl-2">
							{filters[filterKey].map((option) => (
								<label
									key={option}
									className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
								>
									<input type="checkbox" className="mr-3 accent-red-600" />
									<span className="text-gray-600 text-sm">{option}</span>
								</label>
							))}
						</div>
					)}
				</div>
			))}

			<button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition mt-4">
				Clear All
			</button>
		</div>
	);
};

export default function DetailPageTest() {
	const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
	const { data: restaurants, isLoading } = useGetRestaurantsQuery();

	return (
		<div className=" space-y-3 flex flex-col h-screen bg-[#F8F7F4] text-[#3A3F47]">
			{/* Top Search Bar */}
			<div className="bg-white px-6 py-3 flex items-center gap-4 shadow-sm border-b border-[#e5e5e5]">
				{/* Location Select */}
				<div className="flex items-center gap-2 bg-[#f3f6f9] px-3 py-2 rounded-lg border border-[#DCDCDC]">
					<MapPin className="w-5 h-5 text-[#4A5058]" />
					<select className="bg-transparent outline-none text-sm">
						<option>Kathamndu</option>
						<option>Lalitpur</option>
						<option>Bhaktapur</option>
					</select>
				</div>

				{/* Search Field */}
				<div className="flex items-center bg-[#f3f6f9] px-3 py-2 rounded-lg flex-1 border border-[#DCDCDC]">
					<Search className="w-4 h-4 text-[#4A5058]" />
					<input
						type="text"
						placeholder="Location, Restaurant or Cuisine"
						className="ml-2 w-full outline-none text-sm bg-transparent"
					/>
				</div>

				{/* Button */}
				<button className="bg-[#FB8500] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#E76F51] transition">
					Find a restaurant
				</button>
			</div>

			{/* Filter Chips */}
			<div className="border-b bg-white px-6 py-6 flex items-center gap-3 overflow-x-auto overflow-y-hidden">
				{[
					"Featured",
					"Romantic",
					"Italian",
					"Brunch",
					"Mexican",
					"Pizza",
					"Seafood",
					"Japanese",
				].map((f) => (
					<button
						key={f}
						className="px-4 py-1 border rounded-full text-sm bg-[#FFB703]/20 border-[#FFB703] text-[#3A3F47] hover:bg-[#FFB703]/40 transition whitespace-nowrap"
					>
						{f}
					</button>
				))}
			</div>

			<div className="grid grid-cols-12 gap-8">
				<div className="col-span-2 lg:col-span-2">
					<FiltersComponent />
				</div>

				{/* Main Layout */}
				<div className="col-span-10 lg:col-span-10 flex overflow-hidden">
					{/* Left: Restaurant List */}
					<div className="w-2/3 overflow-y-auto border-r border-[#ddd] p-4 bg-[#FDFCFB]">
					
						 <div className="h-screen overflow-scroll position-sticky p-4 bg-[#FDFCFB]">
      {restaurants?.data.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-lg overflow-hidden mb-4 bg-white border-[#e6e6e6] hover:shadow-lg transition-shadow"
        >
          <div className="flex">
            {/* Image Section */}
            <div className="w-56 h-56 flex-shrink-0">
              <img
                src={item.logo}
                alt={item.restaurant_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col">
              {/* Restaurant Name */}
              <h2 className="text-2xl font-bold text-[#2b2b2b] mb-2">
                {item.restaurant_name}
              </h2>
			  <p className="fs-12">{item.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(item.rating)
                          ? 'text-[#FF6B00]'
                          : i < item.rating
                          ? 'text-[#FF6B00]'
                          : 'text-[#ddd]'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#2b2b2b]">
                  {item.rating}
                </span>
                <span className="text-sm text-[#666]">
                  ({item.review_count} reviews)
                </span>
              </div>

              {/* Location and Details */}
              <div className="flex items-center gap-2 text-sm text-[#2b2b2b] mb-3">
                <span>📍</span>
                <span>{item.restaurant_location}</span>
                <span>•</span>
                <span className="text-red-600 font-medium">{item.category}</span>
              </div>

              {/* Tags and Order Button */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {item.cuisine.replace(/[\[\]"]/g, "").split(', ').map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 border border-[#ddd] rounded-full text-sm text-[#2b2b2b] hover:border-[#999] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                onClick={() => navigate(`/restaurant/?id=${item._id}`)}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
					</div>

					{/* Right: Map */}
					<div className="w-2/3 min-h-screen">
		

						<GoogleMapComponent
							restaurants={restaurants?.data || []}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
