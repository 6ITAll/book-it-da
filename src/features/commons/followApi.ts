import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FollowRequest } from './types';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    toggleFollow: builder.mutation<{ success: boolean }, FollowRequest>({
      query: ({ userId, isFollowing }) => ({
        url: '/follow',
        method: 'POST',
        body: { userId, isFollowing },
      }),
    }),
  }),
});

export const { useToggleFollowMutation } = followApi;
