import AddReview from "../Review/ReviewForm";
import FindRestaurants from "./FindRestaurants";
import UsersHomePage from "./UsersHomePage";
import RestaurantDetail from "./RestaurantDetail";

const usersRestaurantRoutes = [
  {
    path: '/users',
    element: <UsersHomePage />,
  },
  {
    path : '/findRestaurants',
    element: <FindRestaurants />
  },
  {
    // path: '/restaurant/:id',
    path: '/restaurant/',
    element: <RestaurantDetail />
  },
  {
    path: '/add-review',
    element: <AddReview />
  }
];

export default usersRestaurantRoutes;
