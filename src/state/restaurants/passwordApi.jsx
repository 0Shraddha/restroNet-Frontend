import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const passwordApi = createApi({
    reducerPath: "password",
    baseQuery: fetchBaseQuery({
        baseUrl : "http://localhost:2700",
    }),
    tagTypes: ["Password"],
    endpoints: (builder) => {
        return{

            addEmail : builder.mutation({
                query: (data) => ({
                    url: '/request-reset',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ["Password"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
            }),

            resetPassword: builder.mutation({
                query: (data) => ({
                    url : `/reset-password`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ["Password"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).

            }),
        }
    }
})

export const { useAddEmailMutation, useResetPasswordMutation } = passwordApi