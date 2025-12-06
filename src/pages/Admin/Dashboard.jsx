import React, { useState } from "react";
import RestaurantTopCard from "../Restaurant/RestaurantTopCard";
import RestaurantTableList from "../Restaurant/RestaurantTableList";
import StatsCard from "../../components/StatsCard";
import { Star, Tag } from "lucide-react";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

    return (
        <div className="mx-auto p-6 space-y-10">


            <RestaurantTableList />
        </div>
    );
}

export default Dashboard;