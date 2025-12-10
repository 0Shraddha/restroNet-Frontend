import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDeleteRestaurantMutation, useGetRestaurantsQuery } from "../../state/restaurants/restuarantApiSlice";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

// ---------- Premium Modern Styles ----------
const customStyles = {
  rows: {
    style: {
      minHeight: "68px",
      borderBottom: "1px solid #E5E7EB",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#F9FAFB",
      fontWeight: "700",
      fontSize: "16px",
      color: "#374151",
      letterSpacing: "0.3px",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      color: "#374151",
    },
  },
};

// ---------- Columns ----------
const getColumns = (navigate, handleDelete) => [
  {
    name: "Logo",
    selector: row => (
      <img
        src={row.logo}
        width={55}
        className="rounded-lg border border-gray-200 shadow-sm"
      />
    ),
    sortable: false,
    width: "120px",
  },
  {
    name: "Name",
    selector: row => row.restaurant_name,
    sortable: true,
    grow: 2,
  },
  // {
  //   name: "Location",
  //   selector: row => row.restaurant_location,
  //   sortable: true,
  // },
  {
    name: "Contact",
    selector: row => row.restaurant_contact || "N/A",
  },
 {
  name: "Cuisine",
  cell: row => {
    // Convert "Indian,Korean" → ["Indian", "Korean"]
    const cuisines = typeof row.cuisine === "string"
      ? row.cuisine.replace(/[\[\]"]/g, "").split(",").map(c => c.trim())
      : [];

    return (
      <div className="flex flex-wrap gap-1">
        {cuisines.length > 0 ? (
          cuisines.map((name, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs"
            >
              {name}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-xs">Various</span>
        )}
      </div>
    );
  },
},
  {
    name: "Menu Manager",
    cell: row => (
      <button
        onClick={() => navigate(`/menu-manager/?id=${row._id}`)}
        className="px-4 py-2 rounded-lg bg-indigo-500 text-white shadow hover:bg-indigo-600 transition-all"
      >
        Manage
      </button>
    ),
    width: "200px",
  },
  {
    name: "Actions",
    cell: row => (
     <div className="flex gap-2">
      <button 
        className="px-4 py-2 rounded-lg bg-gray-500 text-white shadow hover:bg-gray-600 transition-all"
        onClick={() => navigate(`/restaurant-detail/?id=${row._id}`)}>View</button>
      <button
        className="px-4 py-2 rounded-lg bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-all"
        onClick={() => navigate(`/add-restaurant/?id=${row._id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 rounded-lg bg-red-500 text-white shadow hover:bg-red-600 transition-all"
        onClick={() => handleDelete(row._id)}
      >
        Delete
      </button></div>
    ),
    width: "280px",
  },
];


// ---------- Main Component ----------
const RestaurantTableList = () => {
  const navigate = useNavigate();
  const { data: restaurants, isLoading,refetch  } = useGetRestaurantsQuery(); 
  const rows = restaurants?.data || [];

  // -------- Search --------
  const [search, setSearch] = useState("");
  const filteredRows = rows.filter((r) =>
    r.restaurant_name?.toLowerCase().includes(search.toLowerCase())
  );

  //deletion
    const [deleteRestaurant, { isSuccess, isError, error }] = useDeleteRestaurantMutation();
    useEffect(()=>{
        if(isSuccess){
            toast.success("Deleted successfully");
            refetch();
        }
  
        if(isError){
            toast.error(error?.data?.message || "Failed to delete the restaurant!");
        }
      },[isSuccess, isError, error,refetch]);
  

    const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
        try {
        await deleteRestaurant(id).unwrap();
        } catch (e) {
        console.error(e);
        }
    }
    };

  return (
    <div>

      {/* Floating Section Card */}
      <div className="backdrop-blur-sm bg-white/70  shadow-xl rounded-2xl px-4 py-8">

        {/* Search */}
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-red-200 focus:outline-none bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      {/* Data Table Card */}
      <div className="py-6">
        <DataTable
        columns={getColumns(navigate, handleDelete)}
          data={filteredRows}
          progressPending={isLoading}
          pagination
          customStyles={customStyles}
          highlightOnHover
          striped
        />
      </div>
      </div>


    </div>
  );
};

export default RestaurantTableList;
