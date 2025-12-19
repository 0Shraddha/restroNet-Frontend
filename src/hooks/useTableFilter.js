import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useTableFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("_perPage") || "10";
  const query = searchParams.get("_search") || "";
  const category = searchParams.get("_category") || "";
  const cuisine = searchParams.get("_cuisine") || "";

  const setFilters = useCallback(
    (newFilters) => {
      setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params);

        // PAGE
        if (newFilters.page !== undefined) {
          updatedParams.set("page", newFilters.page);
        }

        // PER PAGE  (FIXED)
        if (newFilters.perPage !== undefined) {
          updatedParams.set("_perPage", newFilters.perPage);
        }

        // SEARCH TEXT
        if (newFilters.query !== undefined) {
          if (newFilters.query) {
            updatedParams.set("_search", newFilters.query);
          } else {
            updatedParams.delete("_search");
          }
        }

        // CATEGORY
        if (newFilters.category !== undefined) {
          updatedParams.set("_category", newFilters.category);
        }

        // cuisine
        if (newFilters.cuisine !== undefined) {
          updatedParams.set("_cuisine", newFilters.cuisine);
        }

        return updatedParams;
      });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    query,
    perPage,
    page,
    category,
    cuisine,
    setFilters,
    resetFilters,
  };
};
