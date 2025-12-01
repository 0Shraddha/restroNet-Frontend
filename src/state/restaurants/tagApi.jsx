import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const tagApi  = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getTags : builder.query({
                query: () => '/tag',
                providesTags: ["Tag"],
            }),

            getTagById: builder.query({
                query: (id) => `/tag/${id}`
                ,providesTags: (result, error, id) => [{ type: "Tag", id }],
            }),

            addTag: builder.mutation({
                query: (data) => ({
                    url: "/tag",
                    method: 'POST',
                    body: data,
                    headers: { "Content-Type": "application/json" },
                }),
                invalidatesTags: ["Tag"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
            }),

            updateTag: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/tag/${id}`,
                    method: 'PUT',
                    body: FormData,
                }),
                invalidatesTags: (result, error, { id }) => [
                    "Tag",
                    { type: "Tag", id },
                ],
            }),

            deleteTag: builder.mutation({
                query: (id) => ({
                    url: `/tag/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: (result, error, id) => [
                    "Tag",
                    { type: "Tag", id },
                ]
            })
        }
    }
})

export const {
    useGetTagsQuery,
    useGetTagByIdQuery,
    useAddTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation
} = tagApi;