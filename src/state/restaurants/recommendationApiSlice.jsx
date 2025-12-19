import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendationApiSlice = createApi({
    reducerPath: "recommendations", // Fixed spelling
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2700/", // Added your API prefix
        prepareHeaders: (headers) => {
            // Assuming you store your token in localStorage
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Recommendation", "Rating"],
    endpoints: (builder) => ({
        // 1. THE UNIFIED DISCOVERY API
        // Matches our new GET /api/v1/discover?q=...&cuisine=...
        getDiscovery: builder.query({
            query: ({ q = "", cuisine = "", limit = 10, id } = {}) => ({
                url: `/discover/${id}`,
                method: "GET",
                params: {
                    q,       
                    cuisine, 
                    limit,
                },
            }),
            providesTags: ["Recommendation"],
        }),

        // 2. THE RATING API (Triggers profile updates)
        // Matches POST /api/v1/ratings
        addRating: builder.mutation({
            query: (ratingData) => ({
                url: "/ratings",
                method: "POST",
                body: ratingData, // { venue_id, rating, review }
            }),
            // Invalidates recommendations so the UI refreshes with new tastes
            invalidatesTags: ["Recommendation"], 
        }),

        // 3. GET SINGLE VENUE DETAILS
        getVenueById: builder.query({
            query: (id) => `/venues/${id}`,
            providesTags: (result, error, id) => [{ type: "Recommendation", id }],
        }),

        // Keep your admin mutations if needed, but updated for correct URL paths
        deleteVenue: builder.mutation({
            query: (id) => ({
                url: `/venues/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Recommendation"],
        })
    })
});

export const {
    useGetDiscoveryQuery,
    useAddRatingMutation,
    useGetVenueByIdQuery,
    useDeleteVenueMutation
} = recommendationApiSlice;