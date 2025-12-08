import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../src/map.css";

import markerIcon from "../assets/marker1.png";
import { Star } from "lucide-react";

const customIcon = new Icon({
	iconUrl: markerIcon,
	iconSize: [38, 38],
});

function Recenter({ lat, lng }) {
	const map = useMap();
	useEffect(() => {
		map.setView([lat, lng], 16);
	}, [lat, lng, map]);
	return null;
}

export default function GoogleMapComponent({ restaurants = [] }) {
	// Default fallback
	const defaultRestaurants = [
		{
			name: "Sample Restaurant",
			location: {
				type: "Point",
				coordinates: [85.3247236, 27.6932347], // GeoJSON format: [Long, Lat]
			},
			restaurant_location: "Sample Road 1, Kathmandu",
			hours: "10:00 AM - 9:00 PM",
			logo: markerIcon,
		},
	];

	const data = restaurants.length ? restaurants : defaultRestaurants;
	const centerLat = data[0]?.location?.coordinates?.[1] ?? 27.6932347; // Default to Kathmandu if data is missing
	const centerLng = data[0]?.location?.coordinates?.[0] ?? 85.3247236;
	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current && containerRef.current._leaflet_id) {
			containerRef.current._leaflet_id = null;
		}
	});

	return (
		<div
			ref={containerRef}
			className="w-full h-full rounded-lg overflow-hidden shadow-lg"
		>
			<MapContainer
				center={[centerLat, centerLng]}
				zoom={12}
				style={{ height: "100%", width: "100%" }}
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
						const lng = r.location?.coordinates?.[0];

						// Safety check
						if (!lat || !lng) return null;
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

				<Recenter lat={centerLat} lng={centerLng} />
			</MapContainer>
		</div>
	);
}
