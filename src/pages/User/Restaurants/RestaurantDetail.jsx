import React from "react";
import RestaurantCard from "../../../components/RestaurantCard";
import GoogleMapComponent from "../../../components/Map";

const RestaurantDetail = ({id}) => {
    return(
        <div id={id}>
            <div className="image-group">

            </div>

            <div className="restro-details">
                <div className="restro-title">
                    Cafe Windowpane
                </div>
                <div className="restro-desc">
                    Cafe Windowpane is a charming cafe located in the heart of the city, offering a cozy atmosphere and a delightful menu of coffee and pastries.
                </div>
                <div className="restro-metadata">
                    Lalitpur 44600, Nepal
                    7:00 AM - 10:00 PM
                </div>

                <div className="restro-categories">
                    breakfast, lunch, dinner
                </div>

                <div className="restro-menu">

                </div>

                <div className="restro-location-map">
                   <GoogleMapComponent />
                </div>

                <div className="restro-review">
                    Reviews
                </div>

                <div className="restro-faqs">
                    FAQs
                </div>
            </div>

            <div className="restro-recommendations grid grid-cols-12 gap-4">
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />
                <RestaurantCard />

            </div>

        </div>
        
    )
}


export default RestaurantDetail