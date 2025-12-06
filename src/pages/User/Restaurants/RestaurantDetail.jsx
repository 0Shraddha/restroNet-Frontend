import React, { useState } from "react";
import { useGetRestaurantByIdQuery } from "../../../state/restaurants/restuarantApiSlice";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/card";
import { MapPin, Phone, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import AddReview from "../Review/ReviewForm";
import PreviewMenuItems from "../../Restaurant/Menu/PreviewMenuItems";
import OffersCard from "../../Restaurant/Offers/OffersCard";

const RestaurantDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ➤ New state for Tabs
  const [activeTab, setActiveTab] = useState("overview");

  const { data: restaurantData, isLoading } = useGetRestaurantByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-800 font-semibold">No restaurant found.</p>
          <p className="text-gray-600 mt-2">Please check the restaurant ID and try again.</p>
        </div>
      </div>
    );
  }

  const data = restaurantData?.data;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === data.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };



  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-8">
         {/* IMAGE CAROUSEL */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-85 bg-gray-900">
                {/* Image */}
                {data.images?.length > 0 ? (
                  <>
                    <img
                      src={data.images[currentImageIndex]}
                      alt={`${data.restaurant_name}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Arrows */}
                    {data.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {data.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white w-8"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}

                {/* Logo */}
                {data.logo && (
                  <div className="absolute top-6 left-6 bg-white rounded-2xl p-2 shadow-xl">
                    <img
                      src={data.logo}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

           

            {/* ⭐⭐⭐ TAB SECTION START ⭐⭐⭐ */}
            <div className="bg-white rounded-3xl shadow-lg border-0">
              <div className="border-b px-6">
                <div className="flex gap-6 overflow-x-auto py-4">

                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-2 font-bold ${
                      activeTab === "overview"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    Overview
                  </button>

                  <button
                    onClick={() => setActiveTab("menu")}
                    className={`pb-2 font-bold ${
                      activeTab === "menu"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    Menu
                  </button>

                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-2 font-bold ${
                      activeTab === "reviews"
                        ? "text-red-600 border-b-2 border-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    Reviews
                  </button>

                </div>
              </div>

              {/* TAB CONTENT */}
              <CardContent className="p-6">

                {activeTab === "overview" && (
                  <>
                    <h2 className="text-3xl font-bold mb-2">{data.restaurant_name}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{data.description}</p>
                    <span className="badge badge-soft-info">CUISINE {data.cuisine}</span>
                  </>
                )}

                {activeTab === "menu" && (
                 <>
                  <PreviewMenuItems />
                  </>
                )}

                {/* {activeTab === "offers" && (
                <OffersCard />
                )} */}

                {activeTab === "reviews" && (
                  <p className="text-gray-600">
                    <AddReview />
                    
                  </p>
                )}
              </CardContent>
            </div>
            {/* ⭐⭐⭐ TAB SECTION END ⭐⭐⭐ */}

          </div>

           {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-8 h-fit">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Info</h3>

              {/* LOCATION */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-red-600" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                      {data.restaurant_location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                        {data.restaurant_contact}
                      </p>
                    </div>

                  <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                        11:00 AM – 8:00 PM
                      </p>
                    </div>

                  <p className="text-sm text-slate-800 font-medium capitalize">
                  </p>

                  <div className="h-48 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 flex flex-col justify-center items-center">
                    <MapPin className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500">
                      Lat: {data.lat}, Lng: {data.lng}
                    </p>
                  </div>

                  <button className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700 underline">
                    View larger map →
                  </button>
                </div>
              </div>
            </div>
          </aside>

         
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
