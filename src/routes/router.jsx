import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from './error'
import restaurantRoutes from "../pages/Restaurant/restaurantRoutes";
import SignUpPage from "../pages/Registration";
import { action as authAction } from "../Authentication/Authentication";
import { logout } from "../util/logout";
import Dashboard from "../pages/Admin/Dashboard";
import usersRestaurantRoutes from "../pages/User/Restaurants/usersRestaurantRoutes";
import GetPreferences from "../pages/User/Preference/GetPreferenceForm";
const AllCategories = lazy(()=>import("../pages/Metadata/Metadata"));


const router = createBrowserRouter([
    { path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/auth',
                element: <SignUpPage />,
                action: authAction
            },
            {
                path: '/logout',
                loader: logout
            },
            // {
            //     path: '/manager',
            //     element: <UserList />
            // },
           ...restaurantRoutes,
           ...usersRestaurantRoutes,
           {
            path: "/metadata", element: <AllCategories />
           },
            {
            path: "/metadata/:id", element: <AllCategories />
           },
           {
            path: "/get-preferences", element: <GetPreferences />
           }

        ]
    }
    
])

export default router;