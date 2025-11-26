import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const tagApi  = createApi({
    reducerPath: "tags",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getTags : builder.query({
                query: () => '/tag'
            }),

            getTagById: builder.query({
                query: (id) => `/tag/${id}`
            }),

            addTag: builder.mutation({
                query: (FormData) => ({
                    url: "/tag",
                    method: 'POST',
                    body: FormData,
                })
            }),

            updateTag: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/tag/${id}`,
                    method: 'PUT',
                    body: FormData,
                })
            }),

            deleteTag: builder.mutation({
                query: (id) => ({
                    url: `/tag/${id}`,
                    method: "DELETE",
                })
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