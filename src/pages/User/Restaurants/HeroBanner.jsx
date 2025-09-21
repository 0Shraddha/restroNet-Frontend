import React from "react";

export default function HeroBanner(){
    return (
        <div className="w-full relative">
           <img src="../../../../src/assets/banner.jpg" alt="restro image" className="w-full h-[500px] object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center">
        <input
          type="text"
          className="w-1/2 p-4 rounded-2xl text-lg shadow-lg bg-white"
          placeholder="Search restaurants, cuisines..."
        />
      </div>

        </div>
    )
}
