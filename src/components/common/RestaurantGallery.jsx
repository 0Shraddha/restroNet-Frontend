const RestaurantGallery = ({ images = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Restaurant Gallery
      </h3>

      {images.length === 0 ? (
        <p className="text-gray-500">No images available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
            >
              <img
                src={img}
                alt={`Restaurant ${index + 1}`}
                className="w-full h-32 object-cover transform group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  View Image
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantGallery;