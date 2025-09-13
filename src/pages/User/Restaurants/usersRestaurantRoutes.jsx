import AddReview from "../Review/ReviewForm";
import FindRestaurants from "./FindRestaurants";
import UsersHomePage from "./UsersHomePage";

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
    path: '/add-review',
    element: <AddReview />
  }
];

export default usersRestaurantRoutes;
