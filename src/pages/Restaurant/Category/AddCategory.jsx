import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import DropImageUpload from "../../../components/DropImageUpload";
import { Button } from "../../../components/ui/button";
import { useAddCategoryMutation } from "../../../state/restaurants/categoryApiSlice"

const AddCategory = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [addCategory, {isLoading, isSuccess, isError, error}] = useAddCategoryMutation();

    const [ iconFile, setIconFile ] = useState(null);

    if(isSuccess){
        toast.success("Category added successfully");
        reset();
    }

    if(isError){
        toast.error(error?.data?.message || "Failed to add category");
    }

    const onSubmit = async (data) => {
       const formData = new FormData();
        
       Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
       });

       if(iconFile){
        formData.append('icon', iconFile);
       }

       try{
        await addCategory(formData).unwrap();
        reset();
        setIconFile(null);

       }catch(err){
        console.error("Failed to add category:", err);
       }
    }

    return (
        <>
        <form 
        className="mx-auto p-6 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        >
     <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Category</h2>
      <div className="grid mx-auto max-w-3xl gap-6 ">
        {/* Restaurant Details */}
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm mb-2 font-medium text-gray-700">Category *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="label"
                type="text"
                placeholder="Enter Category"
                {...register('label', { required: 'Category is required' })}
              />
              {errors.label && <p className="error">{errors.label.message}</p>}
            </div>

            <div>
                
              <label htmlFor="label" className="block text-sm mb-2 font-medium text-gray-700">Category Icon *</label>
              {/* Pass setIconFile to update the state in parent */}
              <DropImageUpload multiple={false} onFileChange={setIconFile} /> 
              {iconFile && <p className="text-sm text-gray-600">Selected logo: {iconFile.name}</p>}
            </div>

            <Button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
            >
                {isLoading ? "Submitting..." : "Submit" }

            </Button>
          </CardContent>
        </Card>
      </div>




        </form>
        </>
    )
}

export default AddCategory;
