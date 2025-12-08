import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAddReviewMutation } from "../../../state/restaurants/reviewApi";
import { toast } from "react-toastify";

const AddReview = () => {
  const [hover, setHover] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

const [addReview, { isLoading, isSuccess }] = useAddReviewMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  const user_id = '6878638d8f0567e00c8bb26a';
  const reviewData = {
    user_id: user_id,
    rating: data.rating,
    review: data.review,
    venue_id: id,
};


  try {
    const res = await addReview(reviewData).unwrap();
    toast.success('Review added successfully');
    setSelectedRating(0);
    reset();

  } catch (err) {
    console.error("Error submitting review:", err);
    toast.error("Error submitting review:", err)
  }
};


  return (
    <form
      className="p-8 my-12 bg-white border border-gray-200 shadow-md rounded-2xl space-y-6"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Share Your Experience
        </h3>

        {/* Rating Section */}
        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={26}
                className="cursor-pointer transition-transform hover:scale-110"
                color={
                  (hover || selectedRating) >= star ? "#fbbf24" : "#d1d5db"
                }
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                onClick={() => {
                  setSelectedRating(star);
                  setValue("rating", star, { shouldValidate: true });
                }}
              />
            ))}
          </div>

          <input
            type="hidden"
            {...register("rating", { required: "Rating is required" })}
          />

          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rating.message}
            </p>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Write a Review
        </label>

        <Textarea
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-300 min-h-[120px]"
          placeholder="How was the food, service, and atmosphere?"
          {...register("review", {
            required: "Review is required",
            minLength: {
              value: 10,
              message: "Review must be at least 10 characters long",
            },
          })}
        />

        {errors.review && (
          <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>
        )}
      </div>

      {/* Hidden Fields */}
      <input
        type="hidden"
        value={id}
        {...register("user_id", { required: "User ID is required" })}
      />

      <input
        type="hidden"
        value={id}
        {...register("venue_id", { required: "Venue ID is required" })}
      />

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-red-500 text-white py-3 position-cursor rounded-lg text-base font-semibold hover:bg-red-600 transition-all"
      >
        Submit Review
      </Button>
    </form>
  );
};

export default AddReview;
