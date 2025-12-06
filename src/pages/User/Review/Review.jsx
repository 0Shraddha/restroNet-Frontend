export default function ReviewCard({ review }) {
  const { name, description, rating } = review;
  const initial = name?.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          {initial}
        </div>

        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <div className="flex text-yellow-400 text-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{star <= rating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-4 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
