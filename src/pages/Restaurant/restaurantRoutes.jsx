import AddRestaurant from './AddRestaurant';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';
import { addRestaurants as addRestAction } from '../../api/restaurants'

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
    action: addRestAction
  }
];

export default restaurantRoutes;
