import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../src/map.css";

import markerIcon from '../assets/marker1.png';
import userLocation from '../assets/userLocation.png'
import { ChevronRight, MapPin, Star } from 'lucide-react';
import { Circle } from 'react-leaflet';
import useUserLocation from '../hooks/useUserLocation';

const customIcon = new Icon({
  iconUrl: markerIcon,
  iconSize: [38, 38],
});

const userIcon = new Icon({
  iconUrl: userLocation,
  iconSize: [40, 40],
});

function Recenter({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, long], 16);
  }, [lat, long, map]);
  return null;
}

function distanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function GoogleMapComponent({ restaurants = [] }) {
  const navigate = useNavigate()
  const { location: userLocation, error } = useUserLocation();

  const [showNearby, setShowNearby] = React.useState(false);

  // Default fallback
  const defaultRestaurants = [
    {
      name: 'Sample Restaurant',
      lat: 27.6932347,
      long: 85.3247236,
      restaurant_location: 'Sample Road 1, Kathmandu',
      hours: '10:00 AM - 9:00 PM',
      logo: markerIcon,
    },
  ];

  const data = restaurants.length ? restaurants : defaultRestaurants;
  const centerLat = data[0]?.location?.coordinates?.[1] ?? 27.6932347; // Default to Kathmandu if data is missing
  const centerLon = data[0]?.location?.coordinates?.[0] ?? 85.3247236;
  const containerRef = useRef(null);


  useEffect(() => {
    if (containerRef.current && containerRef.current._leaflet_id) {
      containerRef.current._leaflet_id = null;
    }
  });

  const nearbyRestaurants = userLocation
    ? data.filter((r) =>
      distanceInKm(
        userLocation.lat,
        userLocation.lon,
        r.lat,
        r.lon
      ) <= 5
    )
    : [];


  return (
    <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden shadow-lg">

      <MapContainer
        center={[27.6932347, 85.3247236]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();

            // Custom HTML for the cluster
            return L.divIcon({
              html: `
        <div class="cluster-custom">
          <span>${count}</span>
        </div>
      `,
              className: "custom-marker-cluster",
              iconSize: L.point(40, 40, true),
            });
          }}
        >
          {/* LOOP THROUGH ALL RESTAURANTS */}
          {/* [r?.location?.coordinates[1], r?.location?.coordinates[0]] */}
          {data.map((r, index) => {
            // Extract coordinates from GeoJSON format or fallback to direct lat/lon properties
            const lat = r?.location?.coordinates?.[1] ?? r?.lat ?? 27.6932347;
            const lon = r?.location?.coordinates?.[0] ?? r?.long ?? 85.3247236;

            // Safety check
            if (!lat || !lon) return null;
            return (
              <Marker
                key={index}
                position={[lat, lon]}
                icon={customIcon}
              >

                <Popup>
                  <div className="bg-white overflow-hidden" style={{ minWidth: 280, maxWidth: 380 }}>
                    {/* Horizontal Layout */}
                    <div className="flex">
                      {/* Logo Section - Left */}
                      {r?.logo && (
                        <div className="relative flex-shrink-0 w-28 h-32">
                          <img
                            src={r?.logo}
                            alt={r?.restaurant_name}
                            className="w-full h-full object-cover"
                          />
                      
                        </div>
                      )}

                      {/* Info Section - Right */}
                      <div className="flex-1 p-3 flex flex-col">
                        {/* Restaurant Name */}
                        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
                          {r?.restaurant_name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {r?.rating}
                          </span>
                        </div>

                        {/* Distance */}
                        <div className="flex items-center gap-1 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-600">{r?.distance} away</span>
                        </div>

                        {/* View Details Button */}
                        <button
                          onClick={() => navigate(`/restaurant/?id=${r._id}`)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 group mt-auto"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lon]}
            icon={userIcon}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}

        {userLocation && (
          <Circle
            center={[userLocation.lat, userLocation.lon]}
            radius={5000} // 5 km
            pathOptions={{
              color: "blue",
              fillColor: "rgba(0, 0, 255, 0.2)",
              fillOpacity: 0.3
            }}
          />
        )}


        {/* Recenter map to user location */}
        {userLocation && (
          <Recenter lat={userLocation.lat} long={userLocation.lon} />
        )}

      </MapContainer>


      {/* Slide-In Bottom Sheet */}
      {showNearby && (
        <div className="fixed inset-0 bg-black/40 z-[99999]" onClick={() => setShowNearby(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 
                 shadow-xl max-h-[60vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Nearby Restaurants</h2>
              <button onClick={() => setShowNearby(false)}>✖</button>
            </div>

            {nearbyRestaurants.length === 0 ? (
              <p className="text-gray-600">No restaurants within 5 km.</p>
            ) : (
              <div className="space-y-3">
                {nearbyRestaurants.map((r, i) => {
                  const km = distanceInKm(
                    userLocation.lat,
                    userLocation.lon,
                    r.lat,
                    r.long
                  ).toFixed(2);

                  return (
                    <div
                      key={i}
                      className="p-4 bg-gray-50 rounded-xl border flex justify-between items-center shadow-sm"
                    >
                      <div>
                        <p className="text-base font-medium">{r.restaurant_name}</p>
                        <p className="text-sm text-gray-500">{r.restaurant_location}</p>
                      </div>

                      <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        {km} km
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
