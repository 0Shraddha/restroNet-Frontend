import React from "react";
import StatsCard from "../../../components/StatsCard";
import MenuCards from "./MenuCards";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  useGetMenuByRestaurantQuery,
  useGetMenuQuery,
} from "../../../state/restaurants/menuApiSlice";
import { useGetCategoriesQuery } from "../../../state/restaurants/categoryApiSlice";

const PreviewMenuItems = ({ id }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const venueId = searchParams.get("venueid");
  const isMenuManager = location.pathname === "/menu-manager";

  // ✅ Call hooks unconditionally
  const {
    data: menuManagerMenu,
    isLoading: isMenuManagerLoading,
    isError: isMenuManagerError,
    error: menuManagerError,
  } = useGetMenuQuery(undefined, {
    skip: !isMenuManager,
  });

  const {
    data: restaurantMenu,
    isLoading: isRestaurantMenuLoading,
    isError: isRestaurantMenuError,
    error: restaurantMenuError,
  } = useGetMenuByRestaurantQuery(
    { id: venueId || id },
    { skip: isMenuManager || !venueId && !id }
  );

  const { data: categories } = useGetCategoriesQuery();

  // ✅ Decide which menu to use
  const menus = isMenuManager
    ? menuManagerMenu
    : restaurantMenu;

  console.log({ menus });

  const isLoading = isMenuManagerLoading || isRestaurantMenuLoading;
  const isError = isMenuManagerError || isRestaurantMenuError;
  const error = menuManagerError || restaurantMenuError;

  return (
    <>
      {/* Header */}
      {menus?.length ? (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Menu ({menus?.length || 0})
          </h2>
          <p className="text-gray-600">Discover our delicious offerings</p>
        </div>
      ) : ("")}

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-500">Loading menu items...</p>
      )}

      {/* Error */}
      {isError && (
        <>
          <p className="text-red-800">
            No menu items found
          </p>

        </>
      )}


      {/* Menu Cards */}
      {!isLoading && !isError &&
       
          <MenuCards menu={menus} />

      }
    </>
  );
};

export default PreviewMenuItems;
