import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cuisineApi  = createApi({
    reducerPath: "cuisines",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getCuisines : builder.query({
                query: () => '/cuisine'
            }),

            getCuisineById: builder.query({
                query: (id) => `/cuisine/${id}`
            }),

            addCuisine: builder.mutation({
                query: (FormData) => ({
                    url: "/cuisine",
                    method: 'POST',
                    body: FormData,
                })
            }),

            updateCuisine: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/cuisine/${id}`,
                    method: 'PUT',
                    body: FormData,
                })
            }),

            deleteCuisine: builder.mutation({
                query: (id) => ({
                    url: `/cuisine/${id}`,
                    method: "DELETE",
                })
            })
        }
    }
})

export const {
    useGetCuisinesQuery,
    useGetCuisineByIdQuery,
    useAddCuisineMutation,
    useUpdateCuisineMutation,
    useDeleteCuisineMutation
} = cuisineApi;