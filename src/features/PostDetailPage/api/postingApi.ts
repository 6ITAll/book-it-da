import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OtherPost } from '../types/types';
import { Posting, User } from '@shared/types/type';

export const postingApi = createApi({
  reducerPath: 'postingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPostById: builder.query<Posting, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
    }),
    getBookOtherPosts: builder.query<OtherPost[], string>({
      query: (bookId) => `/books/${bookId}/posts`,
    }),
    getUserOtherPosts: builder.query<OtherPost[], number>({
      query: (userId) => `/users/${userId}/posts`,
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useGetCurrentUserQuery,
  useGetBookOtherPostsQuery,
  useGetUserOtherPostsQuery,
} = postingApi;
