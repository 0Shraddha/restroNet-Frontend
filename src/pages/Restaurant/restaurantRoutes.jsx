import { Suspense, lazy } from 'react';

const RestaurantList = lazy(() => import('./RestaurantList'));
const RestaurantDetail = lazy(() => import('./RestaurantDetail'));
const AddRestaurant = lazy(() => import('./AddRestaurant'));
const AddMenu = lazy(() => import('../Restaurant/Menu/AddMenu'))

const restaurantRoutes = [
  {
    path: '/restaurant-list',
    element: <RestaurantList />,
  },
  {
    path: '/restaurant-detail/:id',
    element: (
    <Suspense fallback={<p>Loading....</p>}><RestaurantDetail />
    </Suspense> )
  },
  {
    path: '/add-restaurant',
    element: <AddRestaurant />,
  },
  {
    path: '/add-menu',
    element: <AddMenu />,
  }
];

export default restaurantRoutes;
