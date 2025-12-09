import React, { useEffect, useRef } from "react"
import {  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent
} from '../../components/ui/card';
import { Button } from "../../components/ui/button";
import { useAddCuisineMutation, useGetCuisineByIdQuery, useUpdateCuisineMutation } from "../../state/restaurants/cuisineApi";
import { useSearchParams } from "react-router-dom";

const AddCuisines = () => {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const id = searchParams.get('id');

    const {register, handleSubmit,setValue, formState: {errors}, reset} = useForm();
    const [addCuisine, {isLoading, isSuccess, isError, error}] = useAddCuisineMutation();
    const {data: singleCuisine } = useGetCuisineByIdQuery( id );
    const [updateCuisine] = useUpdateCuisineMutation();
    const formRef = useRef(null);

    useEffect(() => {
        if (id && singleCuisine?.data) {
          if(formRef.current){
            formRef.current.scrollIntoView({behaviour : "smooth"});
          }
          setValue('name', singleCuisine.data.name);
        } else if (!id) {
            reset();
        }
    }, [singleCuisine, id,setValue, reset]);


    useEffect(()=>{
      if(isSuccess){
          toast.success("Cuisines added successfully");
          reset();
      }

      if(isError){
          toast.error(error?.data?.message || "Failed to add Cuisines");
      }
    },[isSuccess, isError, error, reset]);


    const onSubmit = async (data) => {
      try{
        await addCuisine(data).unwrap();
      }catch(err){
        console.error("Failed to add Cuisines:", err);
      }
    }

    const onUpdate = async (data) => {
      if(!id) return;
      try{
        const response = await updateCuisine({FormData: data, id}).unwrap();
              if(response?.success){
                toast.success("Cuisine updated successfully");
                  }
              reset();
              setSearchParams({});
      }catch(err){
        console.error("Failed to update Cuisines:", err);
      }
    }

    return (
        <>
        <form 
        className="my-5"
        onSubmit={handleSubmit(id ? onUpdate : onSubmit)}
        ref={formRef}
        >
     <h2 className="text-xl font-semibold text-gray-800 mb-3">{id ? `Update` : `Add New`} Cuisines</h2>
      <div className="grid gap-6 ">
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-2 font-medium text-gray-700">Cuisines *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="name"
                type="text"
                placeholder="Enter Cuisines"
                {...register('name', { required: 'Cuisine is required' })}
              />
              {errors.name && 
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

            </div>

            <Button
                type="submit"
                className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-200"
            >
            {id ? `Update` : `Submit`}
            </Button>
          </CardContent>
        </Card>
      </div>




        </form>
        </>
    )
}

export default AddCuisines;
