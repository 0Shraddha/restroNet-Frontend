import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin, Search, Users, Calendar } from "lucide-react";
import GoogleMapComponent from "../../../components/Map";

// Mock data for restaurants
const restaurants = [
  {
    name: "Chop Chop",
    rating: 4.8,
    reviews: 20,
    cuisine: "Japanese",
    city: "Canberra City",
    tags: ["Peaceful", "Great Ambiance", "Delicious"],
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    position: [-0.2202, -78.5127],
  },
  {
    name: "Flui Restaurant",
    rating: 4.9,
    reviews: 61,
    cuisine: "Modern Australian",
    city: "Canberra City",
    tags: ["Great Ambiance", "Delicious", "Dining"],
    logo: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    position: [-0.225, -78.51],
  },
  {
    name: "Window pane Cafe and Restaurant",
    rating: 4.5,
    reviews: 55,
    cuisine: "Continental",
    city: "Canberra City",
    tags: ["Great Ambiance", "Delicious", "Dining"],
    logo: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    position: [-0.225, -78.51],
  },
];

export default function DetailPageTest() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-3 flex flex-col h-screen bg-[#F8F7F4] text-[#3A3F47]">

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
      <div className="border-b bg-white px-6 py-3 flex items-center gap-3 overflow-x-auto shadow-inner">
        {["Featured", "Romantic", "Italian", "Brunch", "Mexican", "Pizza", "Seafood", "Japanese"].map((f) => (
          <button
            key={f}
            className="px-4 py-1 border rounded-full text-sm bg-[#FFB703]/20 border-[#FFB703] text-[#3A3F47] hover:bg-[#FFB703]/40 transition whitespace-nowrap"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Restaurant List */}
        <div className="w-1/3 overflow-y-auto border-r border-[#ddd] p-4 bg-[#FDFCFB]">
          {restaurants.map((data, idx) => (
            <div
              key={idx}
              className="border rounded-xl overflow-hidden mb-6 shadow-md bg-white border-[#ececec] hover:shadow-lg transition"
            >
              <img src={data.logo} alt="" className="w-full h-40 object-cover" />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#3A3F47]">{data.name}</h2>

                <div className="text-sm text-[#4A5058] mt-1">
                  ⭐ {data.rating}{" "}
                  <span className="text-gray-500">({data.reviews})</span> • {data.cuisine} •{" "}
                  {data.city}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {data.tags.map((t) => (
                    <button
                      key={t}
                      className="bg-[#FB8500]/10 text-[#FB8500] px-3 py-1 text-sm rounded hover:bg-[#FB8500]/30 transition"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Map */}
        <div className="w-2/3 min-h-screen">
          {/* <MapContainer center={[-0.22, -78.51]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {restaurants.map((res, i) => (
              <Marker key={i} position={res.position} eventHandlers={{
                click: () => setSelected(res)
              }}>
                <Popup className="text-[#3A3F47] font-medium">{res.name}</Popup>
              </Marker>
            ))}

            {selected && (
              <Polyline
                positions={[
                  [-0.225, -78.515], // Mock "user" location
                  selected.position,
                ]}
                pathOptions={{ color: "#FB8500", weight: 4 }}
              />
            )}
          </MapContainer> */}

          <GoogleMapComponent
                    restaurants={[
                      {
                        name: "Mezze by Roadhouse",
                        lat: 27.7123,
                        lng: 85.3123,
                        address: "Durbar Marg, Kathmandu",
                        hours: "11 AM - 10 PM",
                        image: "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg"
                      },
                      {
                        name: "Bota Donuts",
                        lat: 27.7140,
                        lng: 85.3188,
                        address: "New Road, Kathmandu",
                        hours: "9 AM - 8 PM",
                        image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      },
                      {
                        name: "Vesper Cafe",
                        lat: 27.7192,
                        lng: 85.3274,
                        address: "Jhamsikhel, Lalitpur",
                        hours: "8 AM - 9 PM",
                        image: "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg"
                      }
                    ]}
                  /> 

        </div>
      </div>
    </div>
  );
}
