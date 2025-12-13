import React, { useState } from "react";
import { MapPin, Filter, UserRound } from "lucide-react";
import GoogleMapComponent from "../../../components/Map";
import { useGetRecommendationsQuery } from "../../../state/restaurants/recommendationApiSlice";
import { useTableFilter } from "../../../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import GetPreferences from "../Preference/GetPreferenceForm";
import Search from "../../../components/ui/searchcontent"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
const userPreferences = {
	cuisines: ["Italian", "Japanese", "Nepalese"],
	distance: "5 km",
	category: ["Dinner", "Lunch"],
	tags: ["Romantic", "Outdoor Seating"],
};

export default function DetailPageTest() {
		const { query, perPage, page, category, genre } =
		useTableFilter();
	
	const navigate = useNavigate();
	const { data: restaurants, isLoading } = useGetRecommendationsQuery({
		_search: query,
		_perPage: perPage,
		_page: page,
		_category: category,
		_genre: genre,
	});
	const [filteredByPreferences] = useState(true);
	const [showPreferencesModal, setShowPreferencesModal] = useState(false);

	const restaurantList = restaurants?.data || [];

	const filteredRestaurants = restaurantList;

	//   filteredByPreferences
	//     ? restaurantList.filter((restaurant) => {
	//         const matchesCategory = userPreferences.category.some((cat) =>
	//           restaurant.category?.toLowerCase().includes(cat.toLowerCase())
	//         );
	//         return matchesCategory;
	//       })
	//     : restaurantList;

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p className="text-gray-600 text-lg">Loading restaurants...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-screen bg-[#F7F7F7] text-[#2E2E2E]">
			{/* ⭐ Modern Sticky Header */}
			<div className="sticky top-0 z-20 bg-white border-b shadow-sm">
				<div className="px-8 py-4 flex items-center gap-4 flex-wrap">
					{/* Location Selector */}
					<div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl border border-gray-200">
						<MapPin size={18} className="text-gray-500" />
						<select className="bg-transparent text-sm outline-none font-medium">
							<option>Kathmandu</option>
							<option>Lalitpur</option>
							<option>Bhaktapur</option>
						</select>
					</div>

					{/* Search Input */}
					<div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 flex-1 min-w-[260px]">
						{/* <Search size={18} className="text-gray-500" />
						<input
							type="text"
							placeholder="Search for restaurants or cuisines"
							className="bg-transparent ml-2 w-full text-sm outline-none"
						/> */}
						<Search tableFor={"Search for restaurants or cuisines"} />
					</div>

					{/* Filters Button */}
					<button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-red-700 transition">
						<Filter size={16} />
						Filters
					</button>

					<DropdownMenu className="font-['sora'] ">
						<DropdownMenuTrigger className="rounded-full border-2 p-2 bg-red-700 border-red-700 cursor-pointer hover:bg-red-500 hover:border-red-500">
							<UserRound className=" text-white " />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-red-500 text-white absolute -right-6  ">
							<DropdownMenuItem className="cursor-pointer hover:bg-red-400">
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									navigate("/consumer");
									localStorage.removeItem("user");
								}}
								className="cursor-pointer hover:bg-red-400"
							>
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* ⭐ Preferences Display */}
				<div className="px-8 pb-4">
					{/* <p className="font-semibold text-gray-700 mb-2">Your Preferences:</p> */}

					<div className="flex flex-wrap gap-4">
						<div className="">
							<button
								onClick={() => setShowPreferencesModal(true)}
								className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg font-medium shadow hover:bg-red-500 transition cursor-pointer"
							>
								Update Preferences
							</button>
						</div>
						<div className="flex gap-3">
							{[
								...userPreferences.cuisines,
								...userPreferences.category,
								...userPreferences.tags,
							].map((pref, i) => (
								<span
									key={i}
									className="px-4 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-medium shadow-sm"
								>
									{pref}
								</span>
							))}

							{userPreferences.distance && (
								<span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium shadow-sm">
									Within {userPreferences.distance}
								</span>
							)}
						</div>
					</div>

					{/* ⭐ UPDATE PREFERENCES BUTTON */}
				</div>
			</div>

			{/* ⭐ Results Count */}
			<div className="px-8 py-3 text-sm text-gray-700 font-medium">
				Showing <b>{filteredRestaurants.length}</b> recommended restaurants for
				you.
			</div>

			{/* ⭐ Main Content */}
			<div className="flex flex-1 overflow-hidden">
				{/* LEFT: Restaurant List */}
				<div className="w-1/2 overflow-y-auto p-6 space-y-6 bg-[#FDFDFD] border-r border-gray-200">
					{filteredRestaurants.length === 0 ? (
						<div className="text-center py-20 text-gray-500">
							<p className="text-xl font-bold">No restaurants found</p>
							<p className="text-sm">Try adjusting your preferences</p>
						</div>
					) : (
						filteredRestaurants.map((item) => (
							<div
								key={item._id}
								className="bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200 overflow-hidden"
							>
								<div className="flex">
									{/* Image */}
									<div className="w-56 h-56">
										<img
											src={item.logo}
											alt={item.restaurant_name}
											className="w-full h-full object-cover"
										/>
									</div>

									{/* Content */}
									<div className="flex-1 p-5 flex flex-col font-['Nunito']">
										<h2 className="text-xl font-extrabold text-gray-900 ">
											{item.restaurant_name}
										</h2>
										{/* Rating */}
										<div className="flex items-center gap-2">
											{[...Array(5)].map((_, i) => (
												<span
													key={i}
													className={`text-lg font-extrabold ${
														i < Math.floor(item.rating)
															? "text-red-600"
															: "text-red-700"
													}`}
												>
													★
												</span>
											))}
											<span className="text-sm font-semibold text-gray-700">
												{item.rating}
											</span>
										</div>

										<p className="text-sm mt-1 line-clamp-2">
											{item.description}
										</p>

										{/* Location */}
										<div className="text-sm text-gray-700 mt-2 flex items-center gap-1">
											<MapPin size={14} className="text-gray-500" />
											{item.restaurant_location}
										</div>

										{/* Cuisine Tags */}
										<div className="flex flex-wrap gap-2 mt-3">
											{(Array.isArray(item.cuisine)
												? item.cuisine
												: JSON.parse(item.cuisine || "[]")
											)
												.slice(0, 3)
												.map((tag) => (
													<span
														key={tag}
														className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs text-gray-800 font-medium"
													>
														{tag}
													</span>
												))}
										</div>

										{/* View Details Button */}
										<button
											onClick={() => navigate(`/restaurant/?id=${item._id}`)}
											className="bg-red-600 text-white mt-4 px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium shadow cursor-pointer"
										>
											View Details
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{/* RIGHT: Map */}
				<div className="w-1/2 h-full bg-gray-100">
					<GoogleMapComponent restaurants={restaurants.data} />
				</div>
			</div>

			{showPreferencesModal && (
				<Modal onClose={() => setShowPreferencesModal(false)}>
					<GetPreferences onClose={() => setShowPreferencesModal(false)} />
				</Modal>
			)}
		</div>
	);
}
