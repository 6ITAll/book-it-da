import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@features/user/types';
import { FollowRequest } from '@shared/types/type';
export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['FollowList'],
  endpoints: (builder) => ({
    getFollowList: builder.query<User[], string>({
      query: (userId) => `users/${userId}/follows`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ userId }) => ({
                type: 'FollowList' as const,
                id: userId,
              })),
              { type: 'FollowList', id: 'LIST' },
            ]
          : [{ type: 'FollowList', id: 'LIST' }],
    }),

    toggleFollow: builder.mutation<{ success: boolean }, FollowRequest>({
      query: ({ userId, isFollowing }) => ({
        url: '/follow',
        method: 'POST',
        body: { userId, isFollowing },
      }),
      invalidatesTags: [],
    }),

    deleteFollow: builder.mutation<void, string>({
      query: (followUserId) => ({
        url: `follows/${followUserId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'FollowList', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetFollowListQuery,
  useToggleFollowMutation,
  useDeleteFollowMutation,
} = followApi;
