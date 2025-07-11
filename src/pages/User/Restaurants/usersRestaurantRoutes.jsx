import FindRestaurants from "./FindRestaurants";
import RestaurantRecommendationUI from "./UsersHomePage";

const usersRestaurantRoutes = [
  {
    path: '/users',
    element: <RestaurantRecommendationUI />,
  },
  {
    path : '/findRestaurants',
    element: <FindRestaurants />
  }
];

export default usersRestaurantRoutes;
