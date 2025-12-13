import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewApi = createApi({
    reducerPath: "review",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    // 1. Define tagTypes here
    tagTypes: ['Review'],
    endpoints: (builder) => {
        return {
            // QUERY: Get all reviews
            getReviews : builder.query({
                query: () => '/review',
                // 2. Provides the 'Review' tag for the whole list
                providesTags: (result) => 
                    result 
                        ? [
                            ...result.map(({ id }) => ({ type: 'Review', id })),
                            { type: 'Review', id: 'LIST' },
                          ]
                        : [{ type: 'Review', id: 'LIST' }],
            }),

            // QUERY: Get reviews for a specific venue
            getVenueReviews : builder.query({
                query: (id) => `/venue/${id}/reviews`,
                // 3. Provides a list tag specific to the venue ID
                providesTags: (result, error, id) => 
                    result 
                        ? [
                            ...result.map(({ review_id }) => ({ type: 'Review', id: review_id })),
                            { type: 'Review', id: `VENUE-${id}` },
                          ]
                        : [{ type: 'Review', id: `VENUE-${id}` }],
            }),

            // MUTATION: Add a new review
            addReview: builder.mutation({
                query: (formData) => {
                    console.log(formData, "form data")
                    return({
                        url: "/review",
                        method: 'POST',
                        body: formData,
                    })
                },
                // 4. Invalidates the 'LIST' tag to refetch all reviews
                // It also invalidates the tag for the specific venue (if the venue ID is in the form data)
                invalidatesTags: (result, error, formData) => {
                    const venueId = formData.venueId; // Assuming formData has venueId
                    const tags = [{ type: 'Review', id: 'LIST' }];
                    if (venueId) {
                        tags.push({ type: 'Review', id: `VENUE-${venueId}` });
                    }
                    return tags;
                },
            }),

            // MUTATION: Update an existing review
            updateReview: builder.mutation({
                query: ({data, id}) => ({
                    url : `/review/${id}`,
                    method: 'PUT',
                    body: data,
                }),
                // 5. Invalidates the specific review by ID and the list tag
                invalidatesTags: (result, error, { id, data }) => {
                    const tags = [{ type: 'Review', id }];
                    // Assuming you might want to refetch the whole list or venue list
                    tags.push({ type: 'Review', id: 'LIST' });
                    // Assuming venueId is available in the update data if needed
                    if (data.venueId) {
                        tags.push({ type: 'Review', id: `VENUE-${data.venueId}` });
                    }
                    return tags;
                },
            }),

            // MUTATION: Delete a review
            deleteReview: builder.mutation({
                query: (id) => ({
                    url: `/review/${id}`,
                    method: "DELETE",
                }),
                // 6. Invalidates the 'LIST' tag to refetch all reviews
                // Note: If you knew the venueId here, you could also invalidate the specific VENUE-ID tag.
                invalidatesTags: [{ type: 'Review', id: 'LIST' }],
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