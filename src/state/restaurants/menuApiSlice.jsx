import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const menuApiSlice = createApi({
    reducerPath: "menu",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    tagTypes: ["Menu"],
    endpoints: (builder) => {
        return{
            getMenu : builder.query({
                query: () => '/menu',
                providesTags: ["Menu"],
            }),

            getMenuById : builder.query({
                query: (id) => `/menu/${id}`,
                providesTags: (result, error, id) => [{ type: "Menu", id }],
            }),

            addMenu: builder.mutation({
                query: (formData) => ({
                    url: '/menu',
                    method: 'POST',
                    body: formData,
                }),
                invalidatesTags: ["Menu"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
            }),

            updateMenu: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/menu/${id}`,
                    method: 'PUT',
                    body: FormData,
                }),
                invalidatesTags: (result, error, { id }) => [
                    "Menu",
                    { type: "Menu", id },
                ],
            }),

            deleteMenu: builder.mutation({
                query: (id) => ({
                    url: `/menu/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: (result, error, id) => [
                    "Menu",
                    { type: "Menu", id },
                ]
            })
        }
    }
})

export const { useGetMenuQuery, useGetMenuByIdQuery, useAddMenuMutation, useUpdateMenuMutation } = menuApiSlice