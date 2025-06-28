import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import App from "../App";
import ErrorPage from './error'
import restaurantRoutes from "../pages/Restaurant/restaurantRoutes";

const router = createBrowserRouter([
    { path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <LoginPage />
            },
           ...restaurantRoutes,
        ]
    }
    
])

export default router;