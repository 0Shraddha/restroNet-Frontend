import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../src/map.css'

import markerIcon from '../assets/marker1.png';

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
      name: 'Sample Restaurant',
      lat: 27.7172,
      lng: 85.3240,
      address: 'Sample Road 1, Kathmandu',
      hours: '10:00 AM - 9:00 PM',
      image: markerIcon,
    },
  ];

  const data = restaurants.length ? restaurants : defaultRestaurants;

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current._leaflet_id) {
      containerRef.current._leaflet_id = null;
    }
  });

  return (
    <div ref={containerRef} className="w-full h-100 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[data[0].lat, data[0].lng]}
        zoom={20}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

<MarkerClusterGroup   iconCreateFunction={(cluster) => {
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
  }}>
        {/* LOOP THROUGH ALL RESTAURANTS */}
        {data.map((r, index) => (
          <Marker key={index} position={[r.lat, r.lng]} icon={customIcon}>
            <Popup>
              <div style={{ maxWidth: 200 }}>
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.name}
                    style={{ width: '100%', borderRadius: 6, marginBottom: 8 }}
                  />
                )}
                <h3 style={{ margin: 0, fontSize: 16 }}>{r.name}</h3>
                {r.address && <p>{r.address}</p>}
                <p style={{ fontSize: 13 }}>
                  <strong>Hours:</strong> {r.hours}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        </MarkerClusterGroup>

        {/* Recenter map to first restaurant */}
        <Recenter lat={data[0].lat} lng={data[0].lng} />
      </MapContainer>
    </div>
  );
}
