import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const menuApiSlice = createApi({
    reducerPath: "menu",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    endpoints: (builder) => {
        return{
            getMenu : builder.query({
                query: () => '/menu'
            }),

            getMenuById : builder.query({
                query: (id) => `/menu/${id}`
            }),

            addMenu: builder.mutation({
                query: (formData) => ({
                    url: '/menu',
                    method: 'POST',
                    body: formData,
                })
            }),

            updateMenu: builder.mutation({
                query: ({FormData, id}) => ({
                    url : `/menu/${id}`,
                    method: 'PUT',
                    body: FormData,
                })
            }),

            deleteMenu: builder.mutation({
                query: (id) => ({
                    url: `/menu/${id}`,
                    method: "DELETE",
                })
            })
        }
    }
})

export const { useGetMenuQuery, useGetMenuByIdQuery, useAddMenuMutation } = menuApiSlice