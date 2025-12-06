const RestaurantTopCard = ({
  heading,
  total,
  icon,
  iconPosition = "right",
  menu = false,
}) => {

  return (
    <div
      className={`bg-white rounded-xl shadow-sm px-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100`}
    >
      <div
        className={`flex items-center justify-between ${
          iconPosition === "left" ? "flex-row-reverse" : ""
        }`}
      >
        {/* TEXT PART */}
        <div className="flex-1">
          <p
            className={`${
              menu
                ? "font-semibold text-red-600 text-lg mb-1"
                : "font-medium text-gray-500 text-sm mb-1"
            }`}
          >
            {heading}
          </p>

          <p
            className={`${
              menu
                ? "font-medium text-gray-700 text-sm"
                : "font-bold text-gray-900 text-3xl"
            } leading-tight`}
          >
            {total}
          </p>
        </div>

        {/* ICON PART */}
        <div
          className={`p-2 rounded-xl flex items-center justify-center`}
        >
          <img src={icon} alt="icon" className="w-8 h-8 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantTopCard;
