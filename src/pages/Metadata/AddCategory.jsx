import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import { Input } from "../../components/ui/input";
import {
	Card,
	CardContent
} from "../../components/ui/card";
import DropImageUpload from "../../components/DropImageUpload";
import { Button } from "../../components/ui/button";
import {
	useAddCategoryMutation,
	useGetCategoryByIdQuery,
	useUpdateCategoryMutation,
} from "../../state/restaurants/categoryApiSlice";

const AddCategory = () => {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");

	const [updateCategory] = useUpdateCategoryMutation();
	const [addCategory, { isLoading, isSuccess, isError, error }] =
		useAddCategoryMutation();
	const { data: singleCategory, isLoading: singleCategoryLoading } =
		useGetCategoryByIdQuery({ id });

	const [iconFile, setIconFile] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setIconFile(file);
	};

useEffect(() => {
    if (id && singleCategory?.data) {
        setValue("label", singleCategory.data.label);
    } else if (!id) {
        reset();
    }
}, [singleCategory, id, setValue, reset]);

const imageUrl = id && singleCategory?.data ? singleCategory.data.icon : null;


	const onSubmit = async (data) => {
		console.log(data, "data..........");
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		if (iconFile) {
			formData.append("icon", iconFile);
		}

		Object.entries(data).forEach(([key, value]) => {
			console.log(key, value);
		});

		try {
			const response = await addCategory(formData).unwrap();
      if(response?.success){
        toast.success("Category added successfully!")
        reset();
        setSearchParams({});
			setIconFile(null);
      }else{
        toast.error("Failed to add category!")
      }
			
		} catch (err) {
			console.error("Failed to add category:", err);
		}
	};

	const onUpdate = async (data) => {
		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});
		if (iconFile) {
			formData.append("icon", iconFile);
		}

		Object.entries(data).forEach(([key, value]) => {
			console.log(key, value);
		});

		try {
			const response = await updateCategory({ data: formData, id }).unwrap();
			if(response?.success){
				toast.success("Category updated successfully");
      		}
			reset();
			setIconFile(null);
			setSearchParams({});
		} catch (err) {
			console.error("Failed to add category:", err);
		}
	};

	return (
		<>
			<form
				className="my-5"
				onSubmit={handleSubmit(id ? onUpdate : onSubmit)}
				encType="multipart/form-data"
			>
				<h2 className="text-xl font-semibold text-gray-800 mb-3">
					Add New Category
				</h2>
				<div className="grid gap-6 ">
					{/* Restaurant Details */}
					<Card className="border-gray-100 bg-white text-card-foreground rounded-xl border py-6 shadow-sm">
						<CardContent className="space-y-4">
							<div>
								<label
									htmlFor="label"
									className="block text-sm mb-2 font-medium text-gray-700"
								>
									Category *
								</label>
								<Input
									className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-100"
									id="label"
									type="text"
									placeholder="Enter Category"
									{...register("label", { required: "Category is required" })}
								/>
								{errors.label && (
									<p className="error">{errors.label.message}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="icon"
									className="block text-sm mb-2 font-medium text-gray-700"
								>
									Category Icon *
								</label>
								{/* <input type="file" name="icon" id="icon" onChange={handleFileChange} /> */}
								{/* Pass setIconFile to update the state in parent */}
								<DropImageUpload multiple={false} onFileSelect={setIconFile}  defaultImage={imageUrl}/>
								{iconFile && (
									<p className="text-sm text-gray-600">
										Selected logo: {iconFile.name}
									</p>
								)}
							</div>

							<Button
								type="submit"
								className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 transition-colors duration-200"
							>
								{isLoading ? "Submitting..." : "Submit"}
							</Button>
						</CardContent>
					</Card>
				</div>
			</form>
		</>
	);
};

export default AddCategory;
