import React, { useState } from "react";
import RestaurantTopCard from "../Restaurant/RestaurantTopCard";
import RestaurantTableList from "../Restaurant/RestaurantTableList";
import StatsCard from "../../components/StatsCard";
import { Star, Tag } from "lucide-react";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const cardsData = [
        {
            heading: "Total Restaurants", 
            total: 45, 
            icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>,
                color:"gray"

        },
        { heading: "Top Rated", total: 14, icon: <Star className="w-6 h-6 text-yellow-600" />, color:"yellow" },
        { heading: "Total Cuisisne", total: 35, icon: <Tag className="w-6 h-6 text-orange-600" />, color:"purple" },
        { heading: "Active", 
            total: 40, 
            icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>,
            color:"green"}


    ];

    return (
        <div className="mx-auto p-6 space-y-10">

            <StatsCard cardsData={cardsData} />

            <RestaurantTableList />
        </div>
    );
}

export default Dashboard;