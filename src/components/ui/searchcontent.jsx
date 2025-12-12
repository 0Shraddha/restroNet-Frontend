import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useTableFilter } from "../../hooks/useTableFilter";

export default function SearchContent({ tableFor }) {
  const { query, setFilters } = useTableFilter(); // URL-driven search
  const [searchValue, setSearchValue] = useState(query || "");
  // Sync local input when URL query changes
  useEffect(() => {
    setSearchValue(query || "");
  }, [query]);

  // Trigger search: update URL and reset page
  const triggerSearch = () => {
    setFilters({ query: searchValue, page: 1 });
  };

  // Trigger search automatically when input is cleared
  useEffect(() => {
    if (searchValue === "") {
      triggerSearch();
    }
  }, [searchValue]);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="relative w-full max-w-[380px] flex items-center bg-[#F6F6F6] px-2 py-1.5 rounded-[8px]">
      <Search
      size={18}
        className="text-sm text-[#A2A2A2] cursor-pointer ml-2"
        onClick={triggerSearch}
      />
      <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`${tableFor}`}
        className="placeholder:text-sm text-[#1A1A1A] text-base font-proximaNova
          rounded outline-none border-none focus-visible:ring-0 placeholder:capitalize h-full !shadow-none placeholder:text-[#A2A2A2] !p-0"
      />
      
    </div>
  );
}
