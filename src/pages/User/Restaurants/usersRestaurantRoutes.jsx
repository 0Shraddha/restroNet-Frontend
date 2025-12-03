import AddReview from "../Review/ReviewForm";
import FindRestaurants from "./FindRestaurants";
import UsersHomePage from "./UsersHomePage";
import RestaurantDetail from "./RestaurantDetail";
import DetailPageTest from "./DetailPageTest";

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
    // path: '/restaurant/:id',
    path: '/detail/',
    element: <DetailPageTest />
  },
  {
    path: '/add-review',
    element: <AddReview />
  }
];

export default usersRestaurantRoutes;
