import React, { useState,useEffect } from 'react';
import HeroBanner from './HeroBanner';
import FiltersComponent from './FiltersComponent';
import Navbar from '../Layout/Navbar';
import RestaurantCard from '../../../components/RestaurantCard';

const UsersHomePage = () => {
  return(
    <>
      <Navbar />

      <main>
        <HeroBanner />
      </main>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 bg-gray-100">
            <FiltersComponent />
          </div>
          <div className="col-span-10 bg-white">
            <div className="grid grid-cols-12 gap-4">
             <RestaurantCard />
             <RestaurantCard />
             <RestaurantCard />
             <RestaurantCard />
             <RestaurantCard />

            </div>
          </div>
        </div>

    </>
  )
}

export default UsersHomePage;