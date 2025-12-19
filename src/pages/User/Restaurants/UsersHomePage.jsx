import React, { useState } from "react";
import { MapPin, Filter, UserRound, Clock } from "lucide-react";
import GoogleMapComponent from "../../../components/Map";
import { useTableFilter } from "../../../hooks/useTableFilter";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import GetPreferences from "../Preference/GetPreferenceForm";
import Search from "../../../components/ui/searchcontent";
import { useGetDiscoveryQuery } from "../../../state/restaurants/recommendationApiSlice";
import { useGetCuisinesQuery } from "../../../state/restaurants/cuisineApi";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import useUserLocation from "../../../hooks/useUserLocation";
import { useGetNearestRestaurantsQuery } from "../../../state/restaurants/restuarantApiSlice";
import NearestVenuesList from "./NearestVenueList";
const userPreferences = {
	cuisines: ["Italian", "Japanese", "Nepalese"],
	distance: "5 km",
	category: ["Dinner", "Lunch"],
	tags: ["Romantic", "Outdoor Seating"],
};
  const user = JSON.parse(localStorage.getItem('user'));


const getWalkTime = (distance) => {
	if (!distance) return null;
	const minutes = Math.round((distance / 5) * 60);
	return minutes < 1 ? "< 1 min" : `${minutes} min walk`;
};


export default function DetailPageTest() {
	const { query, perPage, page, category, cuisine, setFilters } =
		useTableFilter();

	const navigate = useNavigate();

	console.log();
	const consumerId = JSON.parse(localStorage.getItem("user"))._id;
	const { data: restaurants, isLoading } = useGetDiscoveryQuery({
		id: consumerId,
		q: query,
		cusine: category,
		limit: 10,
		_perPage: perPage,
		_page: page,
		_category: category,
		cuisine: cuisine,
	});

	const { location: userLocation, error: locationError } = useUserLocation();
	console.log({ userLocation });
	const { data: nearestRestaurants, isNearestLoading } =
		useGetNearestRestaurantsQuery(
			userLocation
				? { lat: userLocation?.lat, lon: userLocation?.lon, limit: 10 }
				: "" // do not run query if no location yet
		);
	const { data: allCuisines } = useGetCuisinesQuery();

	if (locationError) return <p>Could not get your location</p>;
	if (isNearestLoading) return <p>Loading nearest restaurants...</p>;
	const [filteredByPreferences] = useState(true);
	const [showPreferencesModal, setShowPreferencesModal] = useState(false);
	const [selectedCuisines, setSelectedCuisines] = useState([]);


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

	const handleCuisineFilter = (name) => {
		const cuisines = cuisine ? cuisine.split(",") : [];
		const updated = cuisines.includes(name)
			? cuisines.filter((c) => c !== name)
			: [...cuisines, name];
			

		setFilters({
			cuisine: updated.join(","),
		});
	};

	const handleResetCuisine = () => {
		setFilters({
			cuisine: "",
		});
	};

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
					{/* <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl font-medium shadow hover:bg-red-700 transition">
						<Filter size={16} />
						Filters
					</button> */}

					<DropdownMenu className="font-['sora'] ">
						<DropdownMenuTrigger className="rounded-full border-2 p-2 bg-red-600 border-red-600 cursor-pointer hover:bg-red-500 hover:border-red-500">
							<UserRound size={16} className=" text-white " />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-red-500 text-white absolute -right-6  ">
							<DropdownMenuItem className="cursor-pointer hover:bg-red-400">
								<Link to="/profile">Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									navigate("/consumer");
									localStorage.removeItem("user");
								}}
								className="cursor-pointer hover:bg-red-400"
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

						{/* <span className="bg-red-100 border border-red-700 text-red-600 p-2 px-4 rounded-3xl ">{user.username}</span> */}
					
				</div>

				{/* ⭐ Preferences Display */}
				<div className="px-8 pb-4">
					{/* <p className="font-semibold text-gray-700 mb-2">Your Preferences:</p> */}

					<div className="flex flex-wrap gap-4">
						{/* <div className="">
							<button
								onClick={() => setShowPreferencesModal(true)}
								className="px-5 py-2 bg-red-600 text-white text-sm rounded-lg font-medium shadow hover:bg-red-500 transition cursor-pointer"
							>
								Update Preferences
							</button>
						</div> */}
						<div className="flex gap-3">
							{allCuisines?.data?.map((cuisine, i) => {
  const isActive = selectedCuisines.includes(cuisine.name);

  return (
    <span
      key={i}
      onClick={() => handleCuisineFilter(cuisine.name)}
      className={`px-4 cursor-pointer py-1.5 rounded-full text-sm font-medium shadow-sm border
        ${
          isActive
            ? "bg-red-600 text-white border-red-600"
            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-200"
        }
      `}
    >
      {cuisine.name}
    </span>
  );
})}

							{cuisine && (
								<button
									onClick={handleResetCuisine}
									className="px-4 text-sm font-medium border border-red-500 rounded-full bg-red-500 hover:bg-red-600 text-white cursor-pointer "
								>
									Reset
								</button>
							)}
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
					{/* All Listed Venues */}
					<div>
						{restaurants?.data?.length === 0 ? (
							<div className="text-center py-20 text-gray-500">
								<p className="text-xl font-bold">No restaurants found</p>
								<p className="text-sm">Try adjusting your preferences</p>
							</div>
						) : (
							<div className="space-y-4">
								{restaurants?.data?.map((item, index) => (
									<div
										key={item._id}
										className="bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200 overflow-hidden"
									>
										<div className="flex">
											{/* Image */}
											<div className="w-40 h-40 mt-5 ms-3">
												<img
													src={item.logo}
													alt={item.restaurant_name}
													className="w-full h-full object-cover rounded-2xl"
												/>
											</div>

											{/* Content */}
											<div className="flex-1 p-5 flex flex-col font-['Nunito']">
												<h2 className="text-xl font-extrabold text-gray-900">
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
																	: "text-gray-300"
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

												{/* Distance Highlight - Primary Info
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
				  <div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
					  <MapPin className="w-5 h-5 text-blue-600" />
					  <div>

						<p className="text-2xl font-bold text-blue-600">
						  {item?.distance ? `${item?.distance}` : "N/A"}
						</p>
						<p className="text-xs text-gray-600">kilometers away</p>
					  </div>
					</div>
					{item?.distance && (
					  <div className="items-center gap-1 text-gray-600">
						
                  		<p>{item?.restaurant_location || 'Address'}</p>
						<span className="text-xs font-medium flex"><Clock className="w-4 h-4 me-1" />{getWalkTime(item?.distance)}</span>
					  </div>
					)}
				  </div>
				</div> */}

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
																className="px-3 py-1 bg-red-100 border border-red-300 rounded-full text-xs text-red-800 font-medium"
															>
																{tag}
															</span>
														))}
												</div>

												{/* View Details Button */}
												<button
													onClick={() =>
														navigate(`/restaurant/?id=${item._id}`)
													}
													className="bg-red-600 text-white mt-4 px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium shadow cursor-pointer"
												>
													View Details
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* RIGHT: Map */}
				<div className="w-1/2 h-[98] bg-gray-100 mx-3 rounded-3xl">
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
