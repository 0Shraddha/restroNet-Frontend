import { Edit2, Trash2, User } from "lucide-react";

export default function ReviewCard({ reviewData, onDelete, onEdit }) {
  const { review, rating, user_name } = reviewData;

  return (
    <div className="bg-white rounded-sm hover:shadow-md p-5 w-full mb-4 border border-gray-200">
      
      {/* Top row: Avatar + Name + Rating + Actions */}
      <div className="flex items-center justify-between">
        
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white">
            <User size={22} />
          </div>

          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {user_name || "Anonymous User"}
            </p>

            {/* Star Rating */}
            <div className="flex text-yellow-400 text-lg">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>{star <= rating ? "★" : "☆"}</span>
              ))}
            </div>
          </div>
        </div>

			{JSON.parse(localStorage.getItem("user"))?.role == "consumer" ? (

        <div className="flex items-center">
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Edit Review"
          >
            <Edit2 size={18} className="text-blue-600" />
          </button>

          <button
            onClick={onDelete}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Delete Review"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      ) : ( "" )}
      
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mt-4 leading-relaxed text-sm">
        {review}
      </p>
    </div>
  );
}
