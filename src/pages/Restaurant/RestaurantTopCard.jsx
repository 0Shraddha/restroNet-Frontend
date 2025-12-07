const RestaurantTopCard = ({
  heading,
  total,
  menu = false,
}) => {

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm px-4 py-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100`}
    >
          <p
            className={`${
              menu
                ? "font-semibold text-red-600 text-lg mb-1"
                : "font-medium text-gray-500 text-sm mb-1"
            }`}
          >
            {heading}
          </p>
      </div>
  );
};

export default RestaurantTopCard;
