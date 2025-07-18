import AddRestaurant from './AddRestaurant';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';

const restaurantRoutes = [
  {
    path: '/restaurant-list',
    element: <RestaurantList />,
  },
  {
    path: '/restaurant-detail/:id',
    element: <RestaurantDetail />,
  },
  {
    path: '/add-restaurant',
    element: <AddRestaurant />,
  }
];

export default restaurantRoutes;
