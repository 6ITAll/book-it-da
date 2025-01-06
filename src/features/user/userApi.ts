import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    passwordCheck: builder.mutation<
      { success: boolean; message: string },
      { userId: string; password: string }
    >({
      query: ({ userId, password }) => ({
        url: `user/${userId}/password-check`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const { usePasswordCheckMutation } = userApi;
