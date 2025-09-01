import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from './error'
import restaurantRoutes from "../pages/Restaurant/restaurantRoutes";
import SignUpPage from "../pages/Registration";
import { action as authAction } from "../Authentication/Authentication";
import Dashboard from "../pages/Admin/Dashboard";
import usersRestaurantRoutes from "../pages/User/Restaurants/usersRestaurantRoutes";


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
            // {
            //     path: '/manager',
            //     element: <UserList />
            // },
           ...restaurantRoutes,
           ...usersRestaurantRoutes
        ]
    }
    
])

export default router;