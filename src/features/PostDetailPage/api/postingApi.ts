import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Posting, User } from '../types/types';

export const postingApi = createApi({
  reducerPath: 'postingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPostById: builder.query<Posting, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
    }),
  }),
});

export const { useGetPostByIdQuery, useGetCurrentUserQuery } = postingApi;
