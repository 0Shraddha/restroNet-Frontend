import { Flame, Star, TimerIcon } from "lucide-react";
import React from "react";

const MenuCards = ({ menu, currency = "Rs" }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {menu?.data?.map((item) => {
        const unavailable = item.availability === false;

        return (
          <div
            key={item._id}
            className="relative flex overflow-hidden rounded-2xl bg-white border border-orange-200/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            {/* Image */}
            <div className="shrink-0">
              <img
                src={item.image || `https://picsum.photos/seed/${item._id}/320/240`}
                alt={item.item_name}
                className="h-full w-40 md:h-full md:w-44 object-cover"
                loading="lazy"
              />
            </div>

            {/* Body */}
            <div className="flex-1 p-4">
              {/* Header row */}
              <div className="flex items-start gap-3">
                <h3 className="flex-1 font-semibold text-lg leading-snug text-slate-900">
                  {item.item_name || "Untitled"}
                  <span
                    className={`ml-2 align-middle text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      unavailable
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {unavailable ? "Not Available" : "Available"}
                  </span>
                </h3>

                <span className="shrink-0 text-sm font-bold px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 border border-orange-200">
                  {currency} {item.price}
                </span>
              </div>

              {/* Description */}
              <p className="mt-1 text-sm text-slate-600">
                {item.description?.trim() || "—"}
              </p>

              {/* Quick facts */}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  <TimerIcon size={14} /> {item.preparation_time ?? 0} min
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  <Flame size={14} /> {item.spice_level ?? 0}/5
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                  <Star size={14} /> {item.ratings ?? 0}
                </span>
              </div>

              {/* Tags */}
              {(item?.category?.length || item?.ingredients?.length) && (
                <>
                  {/* Categories */}
                  {item?.category?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.category.map((c, i) => (
                        <span
                          key={`cat-${item._id}-${i}`}
                          className="text-[11px] px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ingredients */}
                  {item?.ingredients?.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-medium text-slate-600 mr-1">
                        Ingredients:
                      </span>
                      {item.ingredients.slice(0, 5).map((ing, i) => (
                        <span
                          key={`ing-${item._id}-${i}`}
                          className="text-[11px] px-2 py-1 rounded-full border border-dashed border-orange-200 text-slate-700"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 5 && (
                        <span className="text-[11px] text-slate-500">
                          +{item.ingredients.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Dim overlay if unavailable
            {unavailable && (
              <div className="absolute inset-0 pointer-events-none bg-white/30" />
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default MenuCards;
