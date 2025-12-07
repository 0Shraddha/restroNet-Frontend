import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewApi = createApi({
    reducerPath: "review",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return {
            getVenueReviews : builder.query({
                query: (id) => `/venue/${id}/reviews`
            }),

            addReview: builder.mutation({
                query: (formData) => ({
                    url: "/review",
                    method: 'POST',
                    body: formData,
                })
            }),

            updateReview: builder.mutation({
                query: ({data, id}) => ({
                    url : `/review/${id}`,
                    method: 'PUT',
                    body: data,
                })
            }),

            deleteReview: builder.mutation({
                query: (id) => ({
                    url: `/review/${id}`,
                    method: "DELETE",
                })
            })

        }
    }
})

export const {
    useGetVenueReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewApi;
