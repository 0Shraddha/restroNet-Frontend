import React from "react";
import FilterItems from "../../../components/FilterItems";

const FiltersComponent = () => {

    const priceFilter = {
    title: "Price",
    options: ["Below 500", "500-1000", "1000-2000", "Above 2000"],
    };

    const cuisineFilter = {
    title: "Cuisine",
    options: ["Indian", "Chinese", "Italian", "Mexican"],
    };
    
    const dietFilter = {
    title: "Dietary Options",
    options: ["Vegetarian", "Vegan", "Halal", "Gluten-Free"],
    };

    const mealFilter = {
    title: "Meals",
    options: ["Breakfast", "Lunch", "Dinner", "Late Night"],
    };




    return (
        <>
         <FilterItems filter={priceFilter} />
         <FilterItems filter={cuisineFilter} />
         <FilterItems filter={dietFilter} />
         <FilterItems filter={mealFilter} />



        </>
    )
}

export default FiltersComponent;