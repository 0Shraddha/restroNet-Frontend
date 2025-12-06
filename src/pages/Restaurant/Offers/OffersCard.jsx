import React from "react";
import { Tag } from "lucide-react";

const OffersCard = () => {
   const staticOffers = [
  {
    "title": "Black Friday Offer",
    "discount": 40,
    "banner": "http://localhost:2700/uploads/blackfriday.png",
    "startDate": "2025-11-25",
    "endDate": "2025-11-30",
    "isActive": true
  },
  {
    "title": "Christmas Special",
    "discount": 25,
    "banner": "http://localhost:2700/uploads/christmas.png",
    "startDate": "2025-12-20",
    "endDate": "2025-12-30",
    "isActive": false
  }
]

    return (
        <div className="mt-3">
        <h2 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
            <Tag size={20} /> Existing Offers
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
            {staticOffers.map((offer, index) => (
            <div
                key={index}
                className="bg-white shadow-sm border rounded-xl p-5 hover:shadow-md transition-all duration-200"
            >
                {/* Offer Banner */}
                {offer.banner && (
                <img
                    src={offer.banner}
                    alt="Offer Banner"
                    className="w-full h-36 object-cover rounded-lg mb-4"
                />
                )}

                <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{offer.title}</h3>

                {/* Status */}
                <span
                    className={`text-xs px-3 py-1 rounded-full ${
                    offer.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                    {offer.isActive ? "Active" : "Expired"}
                </span>
                </div>

                {/* Discount */}
                <p className="text-red-600 font-bold text-xl mb-2">
                {offer.discount}% OFF
                </p>

                {/* Date Range */}
                <p className="text-gray-500 text-sm">
                {offer.startDate} → {offer.endDate}
                </p>
            </div>
            ))}
        </div>
        </div>
    );      
};

export default OffersCard;
