import React, { useState } from "react";
import { Clock, MapPin, Search, Users, Calendar, Filter, ChevronDown, X } from "lucide-react";
import GoogleMapComponent from "../../../components/Map";
import { useGetRestaurantsQuery } from "../../../state/restaurants/restuarantApiSlice";
import { useNavigate } from "react-router-dom";

// Mock user preferences - replace with actual user data from your auth/context
const userPreferences = {
	cuisines: ["Italian", "Japanese", "Nepalese"],
	distance: "5",
	category: ["Dinner", "Lunch"],
	tags: ["Romantic", "Casual", "Outdoor Seating"]
};

export default function DetailPageTest() {
	const [selected, setSelected] = useState(null);
	const [filteredByPreferences, setFilteredByPreferences] = useState(true);
	const navigate = useNavigate();
	const { data: restaurants, isLoading } = useGetRestaurantsQuery();

	// Filter restaurants based on user preferences
	const getFilteredRestaurants = () => {
		if (!filteredByPreferences || !restaurants?.data) return restaurants?.data || [];
		
		return restaurants.data.filter(restaurant => {
			// Check if restaurant matches cuisine preferences
			const restaurantCuisines = restaurant?.cuisine?.replace(/[\[\]"]/g, "").split(', ');
			const matchesCuisine = userPreferences?.cuisine?.some(pref => 
				restaurantCuisines.some(cuisine => 
					cuisine.toLowerCase().includes(pref.toLowerCase())
				)
			);

			// Check if restaurant matches category (meal time)
			const matchesCategory = userPreferences.category.some(cat =>
				restaurant.category?.toLowerCase().includes(cat.toLowerCase())
			);

			// You can add more filters here based on tags, distance, etc.
			
			return matchesCuisine || matchesCategory;
		});
	};

	const filteredRestaurants = getFilteredRestaurants();

	const removePreference = (type, value) => {
		// This would update your global state/context
		console.log(`Remove ${type}: ${value}`);
		// userPreferences[type] = userPreferences[type].filter(item => item !== value);
	};

	return (
		<div className="space-y-3 flex flex-col h-screen bg-[#F8F7F4] text-[#3A3F47]">
			{/* Top Search Bar */}
			<div className="bg-white px-6 py-3 flex items-center gap-4 shadow-sm border-b border-[#e5e5e5]">
				{/* Location Select */}
				<div className="flex items-center gap-2 bg-[#f3f6f9] px-3 py-2 rounded-lg border border-[#DCDCDC]">
					<MapPin className="w-5 h-5 text-[#4A5058]" />
					<select className="bg-transparent outline-none text-sm">
						<option>Kathmandu</option>
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

			{/* User Preferences Section */}
			<div className="bg-white px-6 py-4 border-b border-[#e5e5e5]">
				<div className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold text-gray-800">Your Preferences</h3>
					<button
						onClick={() => setFilteredByPreferences(!filteredByPreferences)}
						className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
							filteredByPreferences
								? 'bg-red-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						{filteredByPreferences ? 'Showing Filtered' : 'Show All'}
					</button>
				</div>

				<div className="flex flex-wrap gap-2">
					{/* Cuisines */}
					{userPreferences.cuisines.map((cuisine) => (
						<span
							key={cuisine}
							className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm border border-red-200"
						>
							<span>🍽️ {cuisine}</span>
							<button
								onClick={() => removePreference('cuisines', cuisine)}
								className="hover:bg-red-200 rounded-full p-0.5"
							>
								<X size={14} />
							</button>
						</span>
					))}

					{/* Categories/Meal Times */}
					{userPreferences.category.map((cat) => (
						<span
							key={cat}
							className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm border border-red-200"
						>
							<Clock size={14} />
							<span>{cat}</span>
							<button
								onClick={() => removePreference('category', cat)}
								className="hover:bg-red-200 rounded-full p-0.5"
							>
								<X size={14} />
							</button>
						</span>
					))}

					{/* Tags/Atmosphere */}
					{userPreferences.tags.map((tag) => (
						<span
							key={tag}
							className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
						>
							<span>✨ {tag}</span>
							<button
								onClick={() => removePreference('tags', tag)}
								className="hover:bg-blue-200 rounded-full p-0.5"
							>
								<X size={14} />
							</button>
						</span>
					))}

					{/* Distance */}
					{userPreferences.distance && (
						<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
							<MapPin size={14} />
							<span>Within {userPreferences.distance} km</span>
						</span>
					)}
				</div>

				{filteredByPreferences && (
					<p className="text-sm text-gray-600 mt-3">
						Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} matching your preferences
					</p>
				)}
			</div>


			{/* Main Layout - Restaurant List + Map */}
			<div className="flex overflow-hidden h-full">
				{/* Left: Restaurant List */}
				<div className="w-1/2 overflow-y-auto border-r border-[#ddd] p-4 bg-[#FDFCFB]">
					<div className="space-y-4">
						{filteredRestaurants.length === 0 ? (
							<div className="text-center py-20 text-gray-500">
								<p className="text-xl mb-2">No restaurants found</p>
								<p className="text-sm">Try adjusting your preferences or showing all restaurants</p>
							</div>
						) : (
							filteredRestaurants.map((item, idx) => (
								<div
									key={idx}
									className="border rounded-lg overflow-hidden bg-white border-[#e6e6e6] hover:shadow-lg transition-shadow"
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
											<p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>

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
												<div className="flex gap-2 flex-wrap">
													{item?.cuisine?.replace(/[\[\]"]/g, "")?.split(', ').slice(0, 3).map((tag, i) => (
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
													className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
												>
													View Detail
												</button>
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* Right: Map */}
				<div className="w-1/2 h-full">
					<GoogleMapComponent
						restaurants={filteredRestaurants || []}
					/>
				</div>
			</div>
		</div>
	);
}