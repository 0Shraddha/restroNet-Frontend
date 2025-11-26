import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const categoryApiSlice  = createApi({
    reducerPath: "categories",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getCategories : builder.query({
                query: () => '/category'
            }),

            getCategoryById: builder.query({
                query: (id) => `/category/${id}`
            }),

            addCategory: builder.mutation({
                query: (FormData) => ({
                    url: "/category",
                    method: 'POST',
                    body: FormData,
                })
            }),

            updateCategory: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/category/${id}`,
                    method: 'PUT',
                    body: FormData,
                })
            }),

            deleteCategory: builder.mutation({
                query: (id) => ({
                    url: `/category/${id}`,
                    method: "DELETE",
                })
            })
        }
    }
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
} = categoryApiSlice;