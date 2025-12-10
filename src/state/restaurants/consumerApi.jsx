
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const consumerApi = createApi({
    reducerPath: "consumer",
      baseQuery: fetchBaseQuery({
          baseUrl : "http://localhost:2700",
      }),
  endpoints: (builder) => ({
    // Login API call
    login: builder.mutation({
      query: (credentials) => {
        return({
        url: '/consumer/login',
        method: 'POST',
        body: credentials,
      })},
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: '/consumer/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = consumerApi;
