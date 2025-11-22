import React, { useState, useRef } from "react";
import GoogleMapComponent from "../../../components/Map";

const mockRestaurant = {
  id: 1,
  name: "Urban Spice Kitchen",
  rating: 4.6,
  reviewsCount: 327,
  priceLevel: "$$",
  cuisineTags: ["Asian Fusion", "Nepalese", "Vegan Options"],
  isOpenNow: true,
  nextCloseTime: "11:30 PM",
  distance: "1.4 km",
  deliveryTime: "30–40 min",
  address: "Pulchowk Rd, Lalitpur 44600",
  neighborhood: "Pulchowk",
  phone: "+977-1-5550000",
  lat: 27.7123,
  lng: 85.3123,
  heroImage:
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
  photos: [
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
    "https://images.pexels.com/photos/3535387/pexels-photo-3535387.jpeg",
    "https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg",
  ],
  highlights: ["Outdoor Seating", "Free Wi-Fi", "Family Friendly", "Card Accepted"],
  badges: ["Popular in your area", "Highly rated"],
  menuSections: [
    {
      id: "popular",
      name: "Popular",
      items: [
        {
          id: "momo",
          name: "Jhol Momo (Steamed)",
          description: "House special dumplings in warm, tangy sesame broth.",
          price: "₹260",
          isVeg: true,
          tags: ["Bestseller", "Spicy"],
        },
        {
          id: "thali",
          name: "Veg Newari Thali",
          description: "Traditional assortment with choila, bara, aloo achar & more.",
          price: "₹480",
          isVeg: true,
          tags: ["Signature"],
        },
      ],
    },
    {
      id: "mains",
      name: "Mains",
      items: [
        {
          id: "butter-chicken",
          name: "Butter Chicken with Garlic Naan",
          description: "Creamy tomato gravy, tender chicken, served with naan.",
          price: "₹520",
          isVeg: false,
          tags: ["Rich"],
        },
        {
          id: "stir-fry",
          name: "Stir-Fried Veggies & Tofu",
          description: "Seasonal veggies, tofu, ginger soy glaze.",
          price: "₹390",
          isVeg: true,
          tags: ["Vegan"],
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          id: "iced-lemon-tea",
          name: "Iced Lemon Tea",
          description: "Freshly brewed, lightly sweetened.",
          price: "₹150",
          isVeg: true,
          tags: [],
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      userName: "Anjali",
      rating: 5,
      date: "2 days ago",
      comment:
        "Loved the jhol momo and the cozy ambience. Service was quick and friendly!",
      tags: ["Great food", "Quick service"],
    },
    {
      id: 2,
      userName: "Rahul",
      rating: 4,
      date: "1 week ago",
      comment:
        "Nice place for dinner with friends. Noise level is a bit high on weekends.",
      tags: ["Good for groups"],
    },
  ],
};

function StarRating({ value, size = "text-sm" }) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const totalStars = 5;

  return (
    <div className={`flex items-center gap-1 ${size}`}>
      <div className="flex">
        {Array.from({ length: totalStars }).map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;

          if (isFull) {
            return (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            );
          }
          if (isHalf) {
            return (
              <span key={i} className="text-yellow-400">
                ☆
              </span>
            );
          }
          return (
            <span key={i} className="text-slate-300">
              ★
            </span>
          );
        })}
      </div>
      <span className="font-medium text-slate-900">{value.toFixed(1)}</span>
    </div>
  );
}

function TagPill({ children, variant = "default" }) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-600",
    info: "bg-blue-50 text-blue-600",
    warning: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export default function RestaurantDetail() {
  const [restaurant] = useState(mockRestaurant);

  const [activeTab, setActiveTab] = useState("overview");
  const [activeMenuSection, setActiveMenuSection] = useState(
    restaurant.menuSections[0]?.id || ""
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const sectionRefs = useRef({});

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleMenuTabClick = (id) => {
    setActiveMenuSection(id);
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              aria-label="Go back"
            >
              ←
            </button> */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                Restaurant
              </span>
              <span className="max-w-[210px] truncate text-sm font-semibold text-slate-900 sm:max-w-xs">
                {restaurant.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-base shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
                isFavorite
                  ? "border-rose-200 bg-rose-50 text-rose-500"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
              aria-label="Toggle favorite"
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-lg shadow-slate-900/10">
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <img
              src={restaurant.heroImage}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-xl">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {restaurant.badges.map((badge) => (
                      <TagPill key={badge} variant="success">
                        {badge}
                      </TagPill>
                    ))}
                  </div>
                  <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                    {restaurant.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-100/90">
                    <span className="truncate">
                      {restaurant.cuisineTags.join(" • ")}
                    </span>
                    <span className="hidden text-slate-400 sm:inline">•</span>
                    <span className="hidden sm:inline">{restaurant.priceLevel}</span>
                    <span className="hidden text-slate-400 sm:inline">•</span>
                    <span className="hidden sm:inline">
                      {restaurant.neighborhood}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-slate-200/90">
                    <div className="flex items-center gap-1">
                      <StarRating value={restaurant.rating} />
                      <span className="text-slate-200">
                        ({restaurant.reviewsCount} reviews)
                      </span>
                    </div>
                    <span className="hidden text-slate-400 sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      {restaurant.isOpenNow ? (
                        <TagPill variant="success">Open</TagPill>
                      ) : (
                        <TagPill variant="warning">Closed</TagPill>
                      )}
                      <span className="text-slate-200">
                        Closes {restaurant.nextCloseTime}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 text-right text-xs sm:text-sm text-slate-100/90">
                  <div className="rounded-2xl bg-slate-900/70 px-4 py-2.5 shadow-lg shadow-slate-900/30 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="text-[11px] text-slate-300">
                          Delivery time
                        </p>
                        <p className="text-sm font-semibold sm:text-base">
                          {restaurant.deliveryTime}
                        </p>
                      </div>
                      <span className="h-9 w-px bg-slate-700" />
                      <div className="text-left">
                        <p className="text-[11px] text-slate-300">Distance</p>
                        <p className="text-sm font-semibold sm:text-base">
                          {restaurant.distance}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-4 py-1.5 text-[11px] font-medium text-white shadow-md shadow-emerald-500/40">
                    <span>₹</span>
                    <span>Approx cost per person</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo strip (desktop/tablet) */}
            <div className="absolute right-4 top-4 hidden gap-2 sm:flex">
              {restaurant.photos.slice(1, 4).map((photo, index) => (
                <button
                  key={photo}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-md shadow-slate-900/50 backdrop-blur-sm"
                >
                  <img
                    src={photo}
                    alt={`Restaurant photo ${index + 2}`}
                    className="h-16 w-24 object-cover lg:h-20 lg:w-28"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 text-sm font-medium sm:mt-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "menu", label: "Menu" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-t-xl px-3 pb-3 pt-1 text-sm transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-slate-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto mt-4 max-w-6xl px-4 pb-24 sm:mt-6 sm:px-6 lg:mt-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] lg:gap-8">
          {/* Left column */}
          <div className="space-y-6 lg:space-y-7">
            {activeTab === "overview" && (
              <OverviewSection restaurant={restaurant} />
            )}

            {activeTab === "menu" && (
              <MenuSection
                restaurant={restaurant}
                activeMenuSection={activeMenuSection}
                setActiveMenuSection={handleMenuTabClick}
                sectionRefs={sectionRefs}
              />
            )}

            {activeTab === "reviews" && (
              <ReviewsSection
                rating={restaurant.rating}
                reviews={restaurant.reviews}
              />
            )}
          </div>

          {/* Right column: action card */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Order from {restaurant.name}
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-[13px]">
                Choose how you’d like to enjoy your meal.
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:mt-5">
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left shadow-sm shadow-slate-900/5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Deliver to you
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {restaurant.deliveryTime} • {restaurant.distance} away
                    </p>
                  </div>
                  <span className="text-xl">🛵</span>
                </button>
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-sm shadow-slate-900/5 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Pick up</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Ready in 15–20 min
                    </p>
                  </div>
                  <span className="text-xl">🥡</span>
                </button>
                <button className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left shadow-sm shadow-slate-900/5 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Dine-in reservation
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Tonight · 2 people
                    </p>
                  </div>
                  <span className="text-xl">🍽️</span>
                </button>
              </div>

              <button className="mt-5 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.75 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:py-3">
                Start order
              </button>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-xs sm:mt-6 sm:pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-[13px] text-slate-700">
                    {restaurant.address}
                  </p>
                  <div className="mt-2 h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <GoogleMapComponent restaurants={mockRestaurant}  />
                  </div>
                  <button className="mt-2 text-xs font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700">
                    View larger map
                  </button>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Contact
                  </p>
                  <p className="mt-1 text-[13px] text-slate-700">
                    {restaurant.phone}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Today&apos;s hours
                  </p>
                  <p className="mt-1 text-[13px] text-slate-700">
                    11:00 AM – {restaurant.nextCloseTime}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-500">
              {restaurant.name}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="inline-flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span>{restaurant.rating.toFixed(1)}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
          <button className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-slate-900/20 hover:bg-slate-800">
            Start order
          </button>
        </div>
      </div>
    </div>
  );
}

function OverviewSection({ restaurant }) {
  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
      <div>
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          About
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          Urban Spice Kitchen blends classic Nepalese flavors with modern Asian
          fusion. Perfect for casual dinners, small celebrations, or a cozy solo
          meal.
        </p>
      </div>

      <div className="grid gap-4 text-sm sm:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.highlights.map((item) => (
              <TagPill key={item}>{item}</TagPill>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Cuisines
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisineTags.map((cuisine) => (
              <TagPill key={cuisine} variant="info">
                {cuisine}
              </TagPill>
            ))}
          </div>
        </div>
      </div>

      {/* Photo scroll (mobile) */}
      <div className="space-y-2 sm:hidden">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Photos
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {restaurant.photos.map((photo, index) => (
            <div
              key={photo}
              className="h-32 w-48 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
            >
              <img
                src={photo}
                alt={`Restaurant photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection({
  restaurant,
  activeMenuSection,
  setActiveMenuSection,
  sectionRefs,
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Menu
        </h2>
        <p className="text-[11px] text-slate-500 sm:text-xs">
          Tap a section to jump • Prices are approximate
        </p>
      </div>

      {/* Menu chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-sm">
        {restaurant.menuSections.map((section) => {
          const isActive = activeMenuSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => setActiveMenuSection(section.id)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              {section.name}
            </button>
          );
        })}
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {restaurant.menuSections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="scroll-mt-28 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                {section.name}
              </h3>
              <span className="text-xs text-slate-400">
                {section.items.length} item
                {section.items.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/70">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 px-3 py-3 sm:px-4 sm:py-3.5"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">
                        {item.name}
                      </span>
                      {item.isVeg && <TagPill variant="success">Veg</TagPill>}
                      {item.tags?.map((tag) => (
                        <TagPill key={tag} variant="info">
                          {tag}
                        </TagPill>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 sm:text-[13px]">
                      {item.description}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {item.price}
                    </p>
                  </div>
                  <button className="mt-1 inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm shadow-slate-900/10 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection({ rating, reviews }) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-semibold text-white shadow-md shadow-slate-900/30 sm:h-20 sm:w-20 sm:text-3xl">
            {rating.toFixed(1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 sm:text-[15px]">
              Overall rating
            </p>
            <StarRating value={rating} size="text-base" />
            <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
              Based on recent reviews from diners like you
            </p>
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
          Write a review
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-sm sm:p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {review.userName}
                </p>
                <p className="text-[11px] text-slate-400">{review.date}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-yellow-400">★</span>
                <span className="font-medium text-slate-900">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {review.comment}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {review.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
