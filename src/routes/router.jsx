import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from './error'
import restaurantRoutes from "../pages/Restaurant/restaurantRoutes";
import SignUpPage from "../pages/Registration";
import { action as authAction } from "../Authentication/Authentication";
import Dashboard from "../pages/Dashboard";


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
           ...restaurantRoutes,
        ]
    }
    
])

export default router;