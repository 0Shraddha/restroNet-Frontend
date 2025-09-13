import React, { useState,useEffect } from 'react';

const UsersHomePage = () => {
  return(
    <>
      <nav>
        Navbar hune vayo
      </nav>

      <main>
        search bar component
        <br/>
        <div className="flex">
          <div className="col-5">
            <div className="restaurant-cards">
              Restaurant ko card details
            </div>
          </div>
          <div className="col bg-orange">
            <div className="map-container">
              Map
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UsersHomePage;