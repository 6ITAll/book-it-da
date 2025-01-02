import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@shared/types/type';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: (itemId) => `posts/${itemId}`,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
