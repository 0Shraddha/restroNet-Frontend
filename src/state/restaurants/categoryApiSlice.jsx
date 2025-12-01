import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApiSlice = createApi({
	reducerPath: "categories",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:2700",
	}),
	tagTypes: ["Category"],
	endpoints: (builder) => {
		return {
			getCategories: builder.query({
				query: () => "/category",
				providesTags: ["Category"],
			}),

			getCategoryById: builder.query({
				query: ({ id }) => `/category/${id}`,
				providesTags: (result, error, { id }) => [{ type: "Category", id }],
			}),

			addCategory: builder.mutation({
				query: (FormData) => ({
					url: "/category",
					method: "POST",
					body: FormData,
				}),
				invalidatesTags: ["Category"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
			}),

			updateCategory: builder.mutation({
				query: ({ data, id }) => ({
					url: `/category/${id}`,
					method: "PUT",
					body: data,
				}),
				invalidatesTags: (result, error, { id }) => [
					"Category",
					{ type: "Category", id },
				],
			}),

			deleteCategory: builder.mutation({
				query: (id) => ({
					url: `/category/${id}`,
					method: "DELETE",
				}),
				invalidatesTags: (result, error, id) => [
					"Category",
					{ type: "Category", id },
				]
			}),
		};
	},
});

export const {
	useGetCategoriesQuery,
	useGetCategoryByIdQuery,
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApiSlice;
