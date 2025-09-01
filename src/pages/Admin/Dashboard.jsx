import React, { useState } from "react";
import RestaurantTopCard from "../Restaurant/RestaurantTopCard";
import RestaurantTableList from "../Restaurant/RestaurantTableList";
import StatsCard from "../../components/StatsCard";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">

            <StatsCard />

             {/* Page Content */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to RESTRONET
            </h1>
            <p className="text-gray-600 text-lg">
              Your restaurant management dashboard is ready. Use the sidebar to navigate between different sections.
            </p>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <p className="text-orange-700">
                <span className="font-semibold">Current page:</span> {activeItem}
              </p>
            </div>
          </div>
        </div>

            <RestaurantTableList />
        </div>
    );
}

export default Dashboard;