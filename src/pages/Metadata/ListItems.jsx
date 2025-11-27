import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";

import AddCategory from "./AddCategory";
import AddCuisine from "./AddCuisine";
import AddTags from "./AddTags";
import { useGetCategoriesQuery } from "../../state/restaurants/categoryApiSlice";
import { useEffect } from "react";

const ListItem = ({ type }) => {
	const navigate = useNavigate();


	const { data: category, isLoading } = useGetCategoriesQuery();


	const onEdit = (id) => {
		navigate(`/metadata?id=${id}`);
	};

	const onDelete = (id) => {
		console.log("deleting : ", id);
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
						<h2 className="text-end mb-3 font-semibold">Total categories : <span className="text-lg font-semibold text-orange-800 bg-orange-100 py-1 px-3">{category?.count}</span></h2>
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
												onClick={() => onEdit(cat._id)}
												className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
											>
												<Edit2 size={16} />
											</button>
											<button
												onClick={() => onDelete(cat._id)}
												className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</div>
								))}
						</>
					)}
					{type === "cuisines" && <p>Cuisines</p>}
					{type === "tags" && <p>Tags</p>}
				</div>
			</div>
		</>
	);
};

export default ListItem;
