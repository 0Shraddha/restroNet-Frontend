export default function ReviewCard({ reviewData }) {
  const {  review, rating } = reviewData;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full mb-3">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-xl font-bold">
          U
        </div>

        <div>
          <div className="flex text-yellow-400 text-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{star <= rating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-4 text-md leading-relaxed">
        {review}
      </p>
    </div>
  );
}
