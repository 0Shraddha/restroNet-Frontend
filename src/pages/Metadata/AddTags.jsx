import React, { useEffect } from "react"
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent
} from '../../components/ui/card';
import { Button } from "../../components/ui/button";
import { useAddTagMutation, useGetTagByIdQuery, useUpdateTagMutation } from "../../state/restaurants/tagApi";
import { useSearchParams } from "react-router-dom";

const AddTags = () => {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const id = searchParams.get('id');

    const {register, handleSubmit,setValue, formState: {errors}, reset} = useForm();
    const [addTag, {isLoading, isSuccess, isError, error}] = useAddTagMutation();
    const {data: singleTag } = useGetTagByIdQuery( id );
    const [updateTag] = useUpdateTagMutation();

    useEffect(() => {
        if (id && singleTag?.data) {
          setValue('name', singleTag.data.name);
        } else if (!id) {
            reset();
        }
    }, [singleTag, id,setValue, reset]);


    useEffect(()=>{
      if(isSuccess){
          toast.success("Tags added successfully");
          reset();
      }

      if(isError){
          toast.error(error?.data?.message || "Failed to add Tags");
      }
    },[isSuccess, isError, error, reset]);


    const onSubmit = async (data) => {
      try{
        await addTag(data).unwrap();
      }catch(err){
        console.error("Failed to add Tags:", err);
      }
    }

    const onUpdate = async (data) => {
      if(!id) return;
      try{
        const response = await updateTag({FormData: data, id}).unwrap();
              if(response?.success){
                toast.success("Tag updated successfully");
                  }
              reset();
              setSearchParams({});
      }catch(err){
        console.error("Failed to update Tags:", err);
      }
    }

    return (
        <>
        <form 
        className="my-5"
        onSubmit={handleSubmit(id ? onUpdate : onSubmit)}
        >
     <h2 className="text-xl font-semibold text-gray-800 mb-3">{id ? `Update` : `Add New`} Tags</h2>
      <div className="grid gap-6 ">
        <Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-2 font-medium text-gray-700">Tags *</label>
              <Input
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
                id="name"
                type="text"
                placeholder="Enter Tags"
                {...register('name', { required: 'Tag is required' })}
              />
              {errors.name && 
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

            </div>

            <Button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
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

export default AddTags;
