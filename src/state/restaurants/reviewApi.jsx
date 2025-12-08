import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewApi = createApi({
    reducerPath: "review",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return {
            getReviews : builder.query({
                query: () => '/review'
            }),

            getVenueReviews : builder.query({
                query: (id) => `/venue/${id}/reviews`
            }),

            addReview: builder.mutation({
                query: (formData) => {
                    console.log(formData, "form data")
                    return({
                    url: "/review",
                    method: 'POST',
                    body: formData,
                })}
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
    useGetReviewsQuery,
    useGetVenueReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewApi;
