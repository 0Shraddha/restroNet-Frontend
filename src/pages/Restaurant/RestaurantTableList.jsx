import React, { useState } from "react";
import { Search, Star, MapPin, Phone, Clock, DollarSign, Filter } from "lucide-react";
import { useGetRestaurantsQuery } from "../../state/restaurants/restuarantApiSlice";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const RestaurantTableList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [filterCuisine, setFilterCuisine] = useState("");
    const { data: restaurants, isLoading, isSuccess, isError, error } = useGetRestaurantsQuery();
    console.log({restaurants});

    // const restaurants = [
    //     {
    //         id: 1,
    //         name: "Gusto Cafe",
    //         location: "Thamel, Kathmandu",
    //         specialization: "Italian Cuisine",
    //         rating: 4.5,
    //         priceRange: "$$",
    //         phone: "+977-1-4225678",
    //         hours: "10:00 AM - 10:00 PM",
    //         features: ["WiFi", "Outdoor Seating", "Delivery"],
    //         status: "Open"
    //     },
    //     {
    //         id: 2,
    //         name: "Biryani Hub",
    //         location: "Patan, Lalitpur",
    //         specialization: "Indian & Mughlai",
    //         rating: 4.2,
    //         priceRange: "$",
    //         phone: "+977-1-5547892",
    //         hours: "11:00 AM - 11:00 PM",
    //         features: ["Takeaway", "Family Friendly", "Parking"],
    //         status: "Open"
    //     },
    //     {
    //         id: 3,
    //         name: "Sushi Zen",
    //         location: "Lakeside, Pokhara",
    //         specialization: "Japanese Sushi",
    //         rating: 4.8,
    //         priceRange: "$$$",
    //         phone: "+977-61-465123",
    //         hours: "5:00 PM - 12:00 AM",
    //         features: ["Fine Dining", "Bar", "Reservations Required"],
    //         status: "Open"
    //     },
    //     {
    //         id: 4,
    //         name: "Momo Palace",
    //         location: "New Road, Kathmandu",
    //         specialization: "Nepali Traditional",
    //         rating: 4.0,
    //         priceRange: "$",
    //         phone: "+977-1-4234567",
    //         hours: "9:00 AM - 9:00 PM",
    //         features: ["Local Favorite", "Quick Service", "Budget Friendly"],
    //         status: "Open"
    //     },
    //     {
    //         id: 5,
    //         name: "The Old House",
    //         location: "Bhaktapur Durbar Square",
    //         specialization: "Continental & Newari",
    //         rating: 4.6,
    //         priceRange: "$$",
    //         phone: "+977-1-6613456",
    //         hours: "8:00 AM - 10:00 PM",
    //         features: ["Heritage Location", "Cultural Experience", "Rooftop"],
    //         status: "Closed"
    //     },
    //     {
    //         id: 6,
    //         name: "Fusion Bistro",
    //         location: "Jhamsikhel, Lalitpur",
    //         specialization: "Asian Fusion",
    //         rating: 4.3,
    //         priceRange: "$$",
    //         phone: "+977-1-5532187",
    //         hours: "12:00 PM - 11:00 PM",
    //         features: ["Modern Ambiance", "Cocktails", "Live Music"],
    //         status: "Open"
    //     }
    // ];


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
                        {restaurants && restaurants.data.map((restaurant) => (
                            <tr key={restaurant.id} className="hover:bg-gray-50">
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