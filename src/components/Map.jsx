import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../src/map.css";

import markerIcon from '../assets/marker1.png';
import userLocation from '../assets/userLocation.png'
import { Star } from 'lucide-react';
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
function Recenter({ lat, lon }) {
	const map = useMap();
	useEffect(() => {
		map.setView([lat, lon], 16);
	}, [lat, lon, map]);
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


}

export default function GoogleMapComponent({ restaurants = [] }) {
const {location : userLocation, error} = useUserLocation();

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
  console.log(userLocation, "user")
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
    <div ref={containerRef} className="w-full h-full rounded-lg overflow-hidden shadow-lg">

{/* {userLocation && (
  <button
    onClick={() => setShowNearby(true)}
    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9999] 
               bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg 
               hover:bg-blue-700 transition font-medium"
  >
    Nearby Restaurants ({nearbyRestaurants.length})
  </button>
)} */}

      <MapContainer
        center={[27.6932347, 85.3247236]}
         zoom={12}
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
						const lat = r.location?.coordinates?.[1];
						const lon = r.location?.coordinates?.[0];

						// Safety check
						if (!lat || !lon) return null;
						return (
							<Marker
								key={index}
								position={[
									r?.location?.coordinates[1],
									r?.location?.coordinates[0],
								]}
								icon={customIcon}
							>
								<Popup>
									<div style={{ maxWidth: 200 }}>
										{r.logo && (
											<img
												src={r.logo}
												alt={r.restaurant_name}
												style={{
													width: "100%",
													borderRadius: 6,
													marginBottom: 8,
												}}
											/>
										)}
										<h3 style={{ margin: 0, fontSize: 16 }}>
											{r.restaurant_name}
										</h3>
										<p style={{ fontSize: 13 }}>
											<strong>Hours:</strong> 10:00 AM - 8:00 PM
										</p>
										<div className="flex" style={{ fontSize: 13 }}>
											<Star className="w-3 h-3 me-2 text-yellow-500 fill-yellow-500" />{" "}
											<span>4.5</span>
										</div>
										{/* {r.restaurant_location && <p>{r.restaurant_location}</p>} */}
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
