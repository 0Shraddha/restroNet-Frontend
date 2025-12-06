import React, { useState, useEffect, useRef } from "react";

const MultiSelect = ({ options = [], placeholder = "Select options", onChange, value =[] }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const [selected, setSelected] = useState(value);

useEffect(() => {
  setSelected(value);
}, [value]);


  // Filter options
  const filteredOptions = options.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle select/deselect
  const handleSelect = (item) => {
    let updated;
    if (selected.some((s) => s._id === item._id)) {
      updated = selected.filter((s) => s._id !== item._id);
    } else {
      updated = [...selected, item];
    }
    setSelected(updated);
    onChange(updated);
  };

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      
      {/* INPUT AREA */}
      <div
        className="border border-gray-200 rounded-lg p-2 flex flex-wrap items-center gap-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}

        {selected.map((item) => (
          <span
            key={item._id}
            className="bg-red-100 text-red-700 px-2 py-1 rounded-lg flex items-center gap-1"
          >
            {item.name}
            <button
            type="button"
              className="text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-md p-2 z-50">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-2 py-1 rounded-md mb-2"
            placeholder="Search..."
          />

          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <span>{item.name}</span>
                  <input
                    type="checkbox"
                    checked={selected.some((s) => s._id === item._id)}
                    readOnly
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-2">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
