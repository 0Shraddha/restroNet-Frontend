import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: "review",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2700",
    }),
    tagTypes: ["Review"],
    endpoints: (builder) => ({

        // ================= GET ALL REVIEWS =================
        getReviews: builder.query({
            query: () => "/review",
            providesTags: ["Review"],
        }),

        // ================= GET VENUE REVIEWS =================
        getVenueReviews: builder.query({
            query: (id) => `/venue/${id}/reviews`,
            providesTags: ["Review"],
        }),

        // ================= ADD REVIEW =================
        addReview: builder.mutation({
            query: (formData) => ({
                url: "/review",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Review"],
        }),

        // ================= UPDATE REVIEW =================
        updateReview: builder.mutation({
            query: ({ data, id }) => ({
                url: `/review/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),

        // ================= DELETE REVIEW =================
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review"],
        }),

    }),
});

export const {
    useGetReviewsQuery,
    useGetVenueReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
