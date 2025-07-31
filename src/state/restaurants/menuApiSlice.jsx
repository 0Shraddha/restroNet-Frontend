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

            addMenu: builder.mutation({
                query: (formData) => ({
                    url: '/menu',
                    method: 'POST',
                    body: formData,
                })
            }),
        }
    }
})

export const { useGetMenuQuery, useAddMenuMutation } = menuApiSlice