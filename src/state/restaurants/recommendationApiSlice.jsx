import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const recommendationApiSlice = createApi({
    reducerPath: "recomendations",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return {
            getRecommendations : builder.query({
                query: ({ _perPage, _page, _search = "", _category, _genre } = {}) => ({
                    url: "/recommendations",
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

            getNearestRecommendations : builder.query({
                method: 'GET',
            }),

            getRecommendationById : builder.query({
                query: (id) => `/recommendations/${id}`
            }),

            addRecommendation: builder.mutation({
                query: (formData) => ({
                    url: "/recommendations",
                    method: 'POST',
                    body: formData,
                })
            }),

            updateRecommendation: builder.mutation({
                query: ({data, id}) => {
                    return({
                    url : `/recommendations/${id}`,
                    method: 'PUT',
                    body: data,
                })}
            }),

            deleteRecommendation: builder.mutation({
                query: (id) => ({
                    url: `/recommendations/${id}`,
                    method: "DELETE",
                })
            })

        }
    }
})

export const {
    useGetRecommendationsQuery,
    useGetNearestRecommendationsQuery,
    useGetRecommendationByIdQuery,
    useAddRecommendationMutation, 
    useUpdateRecommendationMutation,
    useDeleteRecommendationMutation
} = recommendationApiSlice;