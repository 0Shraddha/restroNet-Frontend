import { Suspense, lazy } from 'react';

const RestaurantList = lazy(() => import('./RestaurantList'));
const RestaurantDetail = lazy(() => import('./RestaurantDetail'));
const AddRestaurant = lazy(() => import('./AddRestaurant'));
const AddMenu = lazy(() => import('../Restaurant/Menu/AddMenu'))
const AddCategory = lazy(() => import('../Metadata/AddCategory'))
const AddOffers = lazy(() => import('./Offers/AddOffers'));

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
    path: '/menu-manager',
    element: <AddMenu />,
  },
  {
    path: '/add-category',
    element: <AddCategory />,
  },
  {
    path: '/add-offers',
    element: <AddOffers />
  }
  

];

export default restaurantRoutes;
