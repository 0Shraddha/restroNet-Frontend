import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - in real use case, you'd fetch this using `id`
  const restaurant = {
    id,
    name: "La Pinoz Pizza",
    email: "lapinoz@example.com",
    phone: "9800000000",
    cuisine: "Italian",
    type: "Veg & Non-Veg",
    location: "Kathmandu",
    logo: "https://via.placeholder.com/100",
    description:
      "La Pinoz is known for its authentic Italian pizzas, fresh ingredients, and cozy ambiance. A perfect spot for pizza lovers!",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back to List
      </button>

      {/* Restaurant Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={restaurant.logo}
          alt={`${restaurant.name} logo`}
          className="h-24 w-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {restaurant.name}
          </h1>
          <p className="text-gray-500">{restaurant.cuisine} | {restaurant.type}</p>
          <p className="text-gray-500">{restaurant.location}</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="font-semibold">Email:</p>
          <p>{restaurant.email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{restaurant.phone}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <p className="font-semibold text-gray-800 mb-1">Description:</p>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>
    </div>
  );
};

export default RestaurantDetail;
