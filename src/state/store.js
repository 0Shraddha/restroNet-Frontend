import { configureStore } from "@reduxjs/toolkit";
import { restaurantApiSlice } from "./restaurants/restuarantApiSlice";
import { menuApiSlice } from "./restaurants/menuApiSlice";
import { categoryApiSlice } from "./restaurants/categoryApiSlice";
import { cuisineApi } from "./restaurants/cuisineApi";
import { tagApi } from "./restaurants/tagApi";

export const store = configureStore({
    reducer: {  //reducer property specifies a reducer for updating the state
        [restaurantApiSlice.reducerPath] : restaurantApiSlice.reducer,
        [menuApiSlice.reducerPath] : menuApiSlice.reducer,
        [categoryApiSlice.reducerPath] : categoryApiSlice.reducer,
        [cuisineApi.reducerPath] : cuisineApi.reducer,
        [tagApi.reducerPath] : tagApi.reducer,
    },
    middleware: (getDefaultMiddleware) => { //middleware for handling asynchronous state updates
        return getDefaultMiddleware()
        .concat(restaurantApiSlice.middleware)
        .concat(menuApiSlice.middleware)
        .concat(categoryApiSlice.middleware)
        .concat(cuisineApi.middleware)
        .concat(tagApi.middleware);
    }
})