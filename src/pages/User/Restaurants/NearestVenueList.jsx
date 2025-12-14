import React from "react";
import { MapPin, Navigation as NavigationIcon, Clock, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function NearestVenuesSlider({ restaurants = [], onNavigate }) {
  const nearestFive = restaurants?.data?.slice(0, 5) || [];

  if (nearestFive.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-xl">
        <p className="text-gray-500">No nearby restaurants found.</p>
      </div>
    );
  }

  // Calculate estimated walk time (assuming 5 km/h walking speed)
  const getWalkTime = (distance) => {
    if (!distance) return null;
    const minutes = Math.round((distance / 5) * 60);
    return minutes < 1 ? "< 1 min" : `${minutes} min walk`;
  };

  return (
    <div className="my-10">
      {/* Header with Location Context */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
          <MapPin className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Closest to You</h2>
          <p className="text-sm text-gray-500">Sorted by distance from your location</p>
        </div>
      </div>
      
      <div className="relative px-12">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
          }}
          className="restaurants-slider"
        >
        {nearestFive.map((r, index) => (
          <SwiperSlide key={r._id}>
            <div
              className="bg-white rounded-xl overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-red-400 hover:shadow-lg transition-all duration-300"
              onClick={() => onNavigate(`/restaurant/?id=${r._id}`)}
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden bg-gray-100">
                <img
                  src={r.logo || "https://via.placeholder.com/320x200"}
                  alt={r.restaurant_name}
                  className="w-full h-full object-cover"
                />
                
                {/* Ranking Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">#{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">
                  {r.restaurant_name}
                </h3>

                {/* Distance Highlight - Primary Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {r.distance ? `${r.distance}` : "N/A"}
                        </p>
                        <p className="text-xs text-gray-600">kilometers away</p>
                      </div>
                    </div>
                    {r.distance && (
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">{getWalkTime(r.distance)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cuisine Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(Array.isArray(r.cuisine) 
                    ? r.cuisine 
                    : typeof r.cuisine === 'string' 
                      ? JSON.parse(r.cuisine)
                      : []
                  ).slice(0, 2).map((cuisine, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>

                {/* Get Directions Button */}
                <button className="w-full py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors position-cursor flex items-center justify-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  View Restaurant Detail
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
    
  );
}