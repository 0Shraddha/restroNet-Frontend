import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const restaurantApiSlice = createApi({
    reducerPath: "restaurants",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return {
            getRestaurants : builder.query({
                query: ({ _perPage, _page, _search = "", _category, _genre } = {}) => ({
                    url: "/venue",
                    method: "GET",
                    params: {
                    _perPage,
                    _page,
                    _search,
                    _category,
                    _genre,
                    },
                })
            }),

            getNearestRestaurants : builder.query({
                method: 'GET',
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
                query: ({data, id}) => {
                    return({
                    url : `/venue/${id}`,
                    method: 'PUT',
                    body: data,
                })}
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
    useGetNearestRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useAddRestaurantMutation, 
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation
} = restaurantApiSlice;
