import { configureStore } from "@reduxjs/toolkit";
import { restaurantApiSlice } from "./restaurants/restuarantApiSlice";

export const store = configureStore({
    reducer: {  //reducer property specifies a reducer for updating the state
        [restaurantApiSlice.reducerPath] : restaurantApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => { //middleware for handling asynchronous state updates
        return getDefaultMiddleware().concat(restaurantApiSlice.middleware)
    }
})