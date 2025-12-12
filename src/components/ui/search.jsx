import React from "react";
import SearchContent from "../ui/searchcontent"
import Categories from "../ui/categories"
import Sort from "../ui/sort"
import Filter from "../ui/filter"

export const Search = () => {
  return (
    <div className="flex gap-2 mb-4">
      <SearchContent />
      <Categories />
      <Sort />
      <Filter />
    </div>
  );
};
