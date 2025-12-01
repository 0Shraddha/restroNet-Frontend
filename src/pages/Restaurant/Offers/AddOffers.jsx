import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import DropImageUpload from "../../../components/DropImageUpload";

const AddOffer = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [banner, setBanner] = useState(null);

//   const { data: singleOffer } = useGetOfferByIdQuery({ id }, { skip: !id });
//   const [addOffer] = useAddOfferMutation();
//   const [updateOffer] = useUpdateOfferMutation();

//   useEffect(() => {
//     if (id && singleOffer?.data) {
//       setValue("name", singleOffer.data.name);
//       setValue("type", singleOffer.data.type);
//       setValue("description", singleOffer.data.description);
//       setValue("discount", singleOffer.data.discount);
//       setValue("startDate", singleOffer.data.startDate);
//       setValue("endDate", singleOffer.data.endDate);
//       setValue("status", singleOffer.data.status);
//     } else {
//       reset();
//     }
//   }, [singleOffer, id, setValue, reset]);

//   const defaultBanner = id && singleOffer?.data ? singleOffer.data.banner : null;

//   // Submit New Offer
//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (banner) formData.append("banner", banner);

//     try {
//       const res = await addOffer(formData).unwrap();
//       if (res.success) {
//         toast.success("Offer added successfully!");
//         reset();
//         setBanner(null);
//         setSearchParams({});
//       }
//     } catch (err) {
//       toast.error("Failed to add offer");
//       console.error(err);
//     }
//   };

//   // Update Offer
//   const onUpdate = async (data) => {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (banner) formData.append("banner", banner);

//     try {
//       const res = await updateOffer({ id, data: formData }).unwrap();
//       if (res.success) {
//         toast.success("Offer updated successfully");
//         reset();
//         setBanner(null);
//         setSearchParams({});
//       }
//     } catch (err) {
//       toast.error("Failed to update offer");
//       console.error(err);
//     }
//   };

  return (
    <>
      <form
          className="mx-auto p-6 space-y-10"
        // onSubmit={handleSubmit(id ? onUpdate : onSubmit)}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Offer</h2>

        <Card className="border-gray-100 bg-white rounded-xl shadow-sm py-6">
          <CardContent className="space-y-5">
            
            {/* Offer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Offer Name *
              </label>
              <Input
                placeholder="Black Friday, Dashain Sale, Christmas Offer"
                {...register("name", { required: "Offer name is required" })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%) *
              </label>
              <Input
                type="number"
                placeholder="e.g. 20"
                {...register("discount", { required: true, min: 1, max: 100 })}
              />
              {errors.discount && (
                <p className="error">Provide valid discount (1–100%)</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-700">Start Date *</label>
                <Input type="date" {...register("startDate", { required: true })} />
              </div>

              <div>
                <label className="text-sm text-gray-700">End Date *</label>
                <Input type="date" {...register("endDate", { required: true })} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Short offer details..."
                {...register("description")}
              ></textarea>
            </div>

            {/* Offer Banner */}
            <div>
              <label className="block text-sm mb-2 font-medium text-gray-700">
                Offer Banner *
              </label>
              <DropImageUpload
                multiple={false}
                onFileSelect={setBanner}
                // defaultImage={defaultBanner}
              />
              {banner && <p className="text-sm">Selected: {banner.name}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                className="border border-gray-300 w-full rounded-md px-3 py-2"
                {...register("status", { required: true })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
            >
              {id ? "Update Offer" : "Submit Offer"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default AddOffer;
