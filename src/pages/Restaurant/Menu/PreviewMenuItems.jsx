import React from "react";
import StatsCard from "../../../components/StatsCard"
import { Beer, CupSoda, EggFried, IceCreamBowl, Pizza, Salad, Utensils } from "lucide-react";

const PreviewMenuItems = () => {
     const cardsData = [
        {
            heading: "Breakfast", 
            total: "45 items", 
            icon: 
            <EggFried />
            //  <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            //     </svg>
            ,
            color:"gray",
            iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,

        },  
        { heading: "Lunch", total: "14 items", icon: <Pizza className="w-6 h-6 text-black-600" />, color:"gray",iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
          },
        { heading: "Dinner", total: "35 items", icon: <Utensils className="w-6 h-6 text-black-600" />, color:"gray", iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
         },
        { heading: "Soup", 
            total: "40 items", 
            icon: <CupSoda />
            // <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            //   </svg>
              ,
            color:"gray",
            iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
        },
        { heading: "Appetizer", 
            total: "40 items", 
            icon: 
            <Salad />
            // <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            //   </svg>
              ,
            color:"gray",
            iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
        },
        { heading: "Desserts", 
            total: "40 items", 
            icon: <IceCreamBowl />
            // <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            //   </svg>
              ,
            color:"gray",
            iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
        },
        { heading: "Beverages", 
            total: "40 items", 
            icon: <Beer />
            // <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            //   </svg>
              ,
            color:"gray",
            iconPosition: "left",
            padding: "px-6 py-2",
            menu: true,
        },


    ];
    return (
        <>
        <div className="category-section">
            <StatsCard cardsData={cardsData} layout={"grid-cols-1 md:grid-cols-5 gap-2"} />
        </div>
        </>
    )
}


export default PreviewMenuItems;