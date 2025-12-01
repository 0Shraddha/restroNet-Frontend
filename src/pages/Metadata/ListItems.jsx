import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";

import AddCategory from "./AddCategory";
import AddCuisine from "./AddCuisine";
import AddTags from "./AddTags";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../state/restaurants/categoryApiSlice";
import { useEffect } from "react";
import { useDeleteTagMutation, useGetTagsQuery } from "../../state/restaurants/tagApi";
import { toast } from "react-toastify";
import { useGetCuisinesQuery,useDeleteCuisineMutation } from "../../state/restaurants/cuisineApi";

const ListItem = ({ type }) => {
	const navigate = useNavigate();

	const { data: category, isLoading } = useGetCategoriesQuery();
	const { data : tags, isLoading : tagLoading} = useGetTagsQuery();
	const { data: cuisines, isLoading : cuisineLoading} = useGetCuisinesQuery();
	const [deleteCategory, {isSuccess: isCatSuccess, isError: isCatError, error: catError}] = useDeleteCategoryMutation();
    const [deleteTag, { isSuccess, isError, error }] = useDeleteTagMutation();
	const [deleteCuisine, { isSuccess: isCuisineSuccess, isError: isCuisineError, error: cuisineError }] = useDeleteCuisineMutation();

	const onCategoryEdit = (id) => {
		navigate(`/metadata?id=${id}&type=categories`);
	};

	//category deletion
	    useEffect(()=>{
        if(isCatSuccess){
            toast.success("Deleted successfully");
        }
  
        if(isError){
            toast.error(catError?.data?.message || "Failed to delete the restaurant!");
        }
      },[isCatSuccess, isCatError, catError]);
  
	const onCategoryDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
			await deleteCategory(id).unwrap();
			} catch (e) {
			console.error(e);
			}
    	}
	};

	const onTagEdit = (id) => {
		navigate(`/metadata?id=${id}&type=tags`);
	};

	
  //tag deletion
    useEffect(()=>{
        if(isSuccess){
            toast.success("Deleted successfully");
        }
  
        if(isError){
            toast.error(error?.data?.message || "Failed to delete the restaurant!");
        }
      },[isSuccess, isError, error]);
  

    const onTagDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
			await deleteTag(id).unwrap();
			} catch (e) {
			console.error(e);
			}
		}
    };

	//cuisine update
	const onCuisineEdit = (id) => {
		navigate(`/metadata?id=${id}&type=cuisines`);
	};

	
  //tag deletion
    useEffect(()=>{
        if(isCuisineSuccess){
            toast.success("Deleted successfully");
        }
  
        if(isCuisineError){
            toast.error(cuisineError?.data?.message || "Failed to delete the restaurant!");
        }
      },[isSuccess, isError, error]);
  

    const onCuisineDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
			await deleteCuisine(id).unwrap();
			} catch (e) {
			console.error(e);
			}
		}
    };


	return (
		<>
			{type === "categories" && <AddCategory />}
			{type === "cuisines" && <AddCuisine />}
			{type === "tags" && <AddTags />}

			<h2 className="text-xl font-semibold text-gray-800 my-5">
				List of items
			</h2>

			<div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
				<div className="flex-1">
					{type === "categories" && (
						<>
						<h2 className="text-end mb-3 font-semibold">Total Categories : <span className="text-lg font-semibold text-orange-800 bg-orange-100 py-1 px-3">{category?.count > 0 ? category?.count : 0}</span></h2>
							{isLoading && <p>Loading...</p>}

							{!isLoading &&
								category?.data?.map((cat) => (
									<div
										key={cat._id}
										className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<img
												src={cat.icon}
												alt={cat.label}
												className="w-10 h-10 rounded-md object-cover"
											/>
											<span className="font-medium">{cat.label}</span>
										</div>
										<div className="flex space-x-2">
											<button
												onClick={() => onCategoryEdit(cat._id)}
												className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
											>
												<Edit2 size={16} />
											</button>
											<button
												onClick={() => onCategoryDelete(cat._id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
						</>
					)}
					{type === "tags" && (
						<>
						<h2 className="text-end mb-3 font-semibold">Total Tags : <span className="text-lg font-semibold text-orange-800 bg-orange-100 py-1 px-3">{tags?.count > 0 ? tags?.count : 0}</span></h2>
							{isLoading && <p>Loading...</p>}

							{!isLoading &&
								tags?.data?.map((tag) => (
									<div
										key={tag._id}
										className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									>
											<span className="font-medium">{tag.name}</span>
										<div className="flex space-x-2">
											<button
												onClick={() => onTagEdit(tag._id)}
												className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
											>
												<Edit2 size={16} />
											</button>
											<button
												onClick={() => onTagDelete(tag._id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
						</>
					)}
					{type === "cuisines" && (
						<>
						<h2 className="text-end mb-3 font-semibold">Total Cuisines : <span className="text-lg font-semibold text-orange-800 bg-orange-100 py-1 px-3">{cuisines?.count > 0 ? cuisines?.count : 0}</span></h2>
							{isLoading && <p>Loading...</p>}

							{!isLoading &&
								cuisines?.data?.map((cuisine) => (
									<div
										key={cuisine._id}
										className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									>
											<span className="font-medium">{cuisine.name}</span>
										<div className="flex space-x-2">
											<button
												onClick={() => onCuisineEdit(cuisine._id)}
												className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
											>
												<Edit2 size={16} />
											</button>
											<button
												onClick={() => onCuisineDelete(cuisine._id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ListItem;
