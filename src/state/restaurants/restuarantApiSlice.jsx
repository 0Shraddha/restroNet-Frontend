import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const restaurantApiSlice = createApi({
    reducerPath: "restaurants",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return {
            getRestaurants : builder.query({
                query: () => '/venue'
            }),

            getRestaurantById : builder.query({
                query: (id) => `/venue/${id}`
            }),

            addRestaurant: builder.mutation({
                query: (formData) => ({
                    url: "/venue",
                    method: 'POST',
                    body: formData,
                })
            }),

            updateRestaurant: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/venue/${id}`,
                    method: 'PUT',
                    body: FormData,
                })
            }),

            deleteRestaurant: builder.mutation({
                query: (id) => ({
                    url: `/venue/${id}`,
                    method: "DELETE",
                })
            })

        }
    }
})

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useAddRestaurantMutation, 
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation
} = restaurantApiSlice;
