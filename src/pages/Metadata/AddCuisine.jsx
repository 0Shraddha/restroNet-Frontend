import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent
} from '../../components/ui/card';
import { Button } from "../../components/ui/button";
// import { useAddCategoryMutation } from "../../state/restaurants/categoryApiSlice"

const AddCuisine = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    // const [addCategory, {isLoading, isSuccess, isError, error}] = useAddCategoryMutation();


    // useEffect(()=>{
    //   if(isSuccess){
    //       toast.success("Cuisine added successfully");
    //       reset();
    //   }

    //   if(isError){
    //       toast.error(error?.data?.message || "Failed to add Cuisine");
    //   }
    // },[isSuccess, isError, error, reset]);

    

    // const onSubmit = async (data) => {
    //   console.log(data, "data..........")
    //    const formData = new FormData();
    //    Object.entries(data).forEach(([key, value]) => {
    //         formData.append(key, value);
    //    });

    //    try{
    //     await addCategory(formData).unwrap();
    //     reset();

    //    }catch(err){
    //     console.error("Failed to add category:", err);
    //    }
    // }

    const onSubmit = async (data) => {
      console.log({data});

      const formData = new FormData();
      formData.append('label', data.label);
      console.log({formData});
    }

    return (
        <>
        <form 
        className="my-5"
        onSubmit={handleSubmit(onSubmit)}
        >
     <h2 className="text-xl font-semibold text-gray-800 mb-3">Add New Cuisine</h2>
      <div className="grid gap-6 ">
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm mb-2 font-medium text-gray-700">Cuisine *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="label"
                type="text"
                placeholder="Enter Cuisine"
                {...register('label', { required: 'Cuisine is required' })}
              />
              {errors.label && <p className="error">{errors.label.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
            >
            {/* {isLoading ? "Submitting..." : "Submit" } */}
            Submit
            </Button>
          </CardContent>
        </Card>
      </div>




        </form>
        </>
    )
}

export default AddCuisine;
