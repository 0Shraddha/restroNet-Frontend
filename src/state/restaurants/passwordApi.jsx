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
                    url: '/add-email',
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ["Password"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).
            }),

            addOtp: builder.mutation({
                query: (data) => ({
                    url : `/add-otp`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ["Password"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).

            }),

            changePassword: builder.mutation({
                query: (data) => ({
                    url : `/change-password`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ["Password"], //InvalidatesTags - Used in mutations (POST, PUT, DELETE).

            }),
        }
    }
})

export const { useAddEmailMutation, useAddOtpMutation, useChangePasswordMutation } = passwordApi