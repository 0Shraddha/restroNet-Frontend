import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from './error'
import restaurantRoutes from "../pages/Restaurant/restaurantRoutes";
import SignUpPage from "../pages/Registration";
import SignUpPageUser from "../pages/UserRegistration";
import { action as authAction } from "../Authentication/Authentication";
import { logout } from "../util/logout";
import Dashboard from "../pages/Admin/Dashboard";
import usersRestaurantRoutes from "../pages/User/Restaurants/usersRestaurantRoutes";
import GetPreferences from "../pages/User/Preference/GetPreferenceForm";
import MenuDisplay from "../pages/Restaurant/Menu/MenuDisplay";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
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
                element: <SignUpPageUser />,

                action: authAction
            },
             {
                path: '/consumer',
                element: <SignUpPage />,

                action: authAction
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />
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
           },
           {path: "/pos", element: <MenuDisplay />}

        ]
    }
    
])

export default router;