import AddReview from "../Review/ReviewForm";
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
  },
  {
    path: '/add-review',
    element: <AddReview />
  }
];

export default usersRestaurantRoutes;
