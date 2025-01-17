import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LikeRequest } from './types';

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    toggleLike: builder.mutation<{ success: boolean }, LikeRequest>({
      query: ({ postId, isLiked }) => ({
        url: '/like',
        method: 'POST',
        body: { postId, isLiked },
      }),
    }),
  }),
});

export const { useToggleLikeMutation } = likeApi;
