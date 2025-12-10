

export const authenticateApi = createApi({
  endpoints: (builder) => ({
    // Login API call
    login: builder.mutation({
      query: (credentials) => {
        return({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      })},
    }),

    signup: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authenticateApi;
