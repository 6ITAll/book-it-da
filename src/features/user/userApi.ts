import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Account } from './types';

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

    getUserInfo: builder.query<Account, string>({
      query: (userId) => `user/${userId}`,
    }),

    updateUserInfo: builder.mutation<
      { success: boolean; message: string },
      { userId: string; field: string; value: string }
    >({
      query: ({ userId, field, value }) => ({
        url: `user/${userId}`,
        method: 'PUT',
        body: { [field]: value },
      }),
    }),
  }),
});

export const {
  usePasswordCheckMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} = userApi;
