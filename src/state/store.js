import { configureStore } from "@reduxjs/toolkit";
import { restaurantApiSlice } from "./restaurants/restuarantApiSlice";
import { menuApiSlice } from "./restaurants/menuApiSlice";
import { categoryApiSlice } from "./restaurants/categoryApiSlice";
import { cuisineApi } from "./restaurants/cuisineApi";
import { tagApi } from "./restaurants/tagApi";
import { reviewApi } from "./restaurants/reviewApi";
import { consumerApi } from "./restaurants/consumerApi";
import { recommendationApiSlice } from "./restaurants/recommendationApiSlice";


export const store = configureStore({
    reducer: {  //reducer property specifies a reducer for updating the state
        [restaurantApiSlice.reducerPath] : restaurantApiSlice.reducer,
        [recommendationApiSlice.reducerPath] : recommendationApiSlice.reducer,
        [menuApiSlice.reducerPath] : menuApiSlice.reducer,
        [categoryApiSlice.reducerPath] : categoryApiSlice.reducer,
        [cuisineApi.reducerPath] : cuisineApi.reducer,
        [tagApi.reducerPath] : tagApi.reducer,
        [reviewApi.reducerPath] : reviewApi.reducer,
        [consumerApi.reducerPath] : consumerApi.reducer,

    },
    middleware: (getDefaultMiddleware) => { //middleware for handling asynchronous state updates
        return getDefaultMiddleware()
        .concat(restaurantApiSlice.middleware)
        .concat(recommendationApiSlice.middleware)
        .concat(menuApiSlice.middleware)
        .concat(categoryApiSlice.middleware)
        .concat(cuisineApi.middleware)
        .concat(tagApi.middleware)
        .concat(reviewApi.middleware)
        .concat(consumerApi.middleware)
    }
})