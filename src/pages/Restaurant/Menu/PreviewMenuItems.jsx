import React, { useEffect } from "react";
import StatsCard from "../../../components/StatsCard"
import { Beer, CupSoda, EggFried, IceCreamBowl, Pizza, Salad, Utensils } from "lucide-react";
import { useGetMenuQuery } from "../../../state/restaurants/menuApiSlice";
import MenuCards from "./MenuCards";
import { useGetCategoriesQuery } from "../../../state/restaurants/categoryApiSlice";

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

    const { data: menu,  isLoading, isSuccess, isError, error} = useGetMenuQuery();
    const { data: categories } = useGetCategoriesQuery();
    

    useEffect(() => {
      isLoading && <p>Loading menu items...</p>;

      isError && <p className="text-red-800">Error loading menu items: {error?.data?.message || "Unknown error"}</p>;
    },
    [isLoading, isSuccess, isError, error]);

    return (
        <>
          {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Menu ({menu?.count ?? 0})</h2>
        <p className="text-gray-600">Discover our delicious offerings</p>
      </div>

      <StatsCard cardsData={categories?.data} layout={"grid-cols-1 md:grid-cols-8 gap-2"} />
     
      <MenuCards menu={menu} />
     
       
        </>
    )
}


export default PreviewMenuItems;