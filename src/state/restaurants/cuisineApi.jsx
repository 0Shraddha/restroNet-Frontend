import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cuisineApi  = createApi({
    reducerPath: "cuisines",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getCuisines : builder.query({
                query: () => '/cuisine',
                providesTags: ["Cuisine"],
            }),

            getCuisineById: builder.query({
                query: (id) => `/cuisine/${id}`
                ,providesTags: (result, error, id) => [{ type: "Cuisine", id }],
            }),

            addCuisine: builder.mutation({
                query: (data) => ({
                    url: "/cuisine",
                    method: 'POST',
                    body: data,
                    headers: { "Content-Type": "application/json" },
                }),
                invalidatesTags: ["Cuisine"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
            }),

            updateCuisine: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/cuisine/${id}`,
                    method: 'PUT',
                    body: FormData,
                }),
                invalidatesTags: (result, error, { id }) => [
                    "Cuisine",
                    { type: "Cuisine", id },
                ],
            }),

            deleteCuisine: builder.mutation({
                query: (id) => ({
                    url: `/cuisine/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: (result, error, id) => [
                    "Cuisine",
                    { type: "Cuisine", id },
                ]
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