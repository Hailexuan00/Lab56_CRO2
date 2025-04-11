// services/serverApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com/' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignupMutation } = serverApi;
