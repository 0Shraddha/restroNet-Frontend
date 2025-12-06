import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Textarea } from '../../../components/ui/textarea'
import { Button } from '../../../components/ui/button'
import { Star } from 'lucide-react'

const AddReview = () => {
  const [hover, setHover] = useState(null);
const [selectedRating, setSelectedRating] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        rsest,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
       <form
      method="POST"
      className="flex flex-col gap-4 p-8 my-12 border border-gray-200 rounded-xl shadow-sm bg-white"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
     <div className="flex align-center justify-between">
         <h3 className="text-xl font-semibold text-gray-800">Give a Review</h3>
        <div>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={20}
                    className="cursor-pointer transition"
                    color={(hover || selectedRating) >= star ? "#fbbf24" : "#d1d5db"}
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
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
        </div>
     </div>

      {/* Description */}
      <div>
        <Textarea
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
          placeholder="Tell something about the restaurant..."
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>




      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
      >
        Submit Review
      </Button>
    </form>
    )
}

export default AddReview;;