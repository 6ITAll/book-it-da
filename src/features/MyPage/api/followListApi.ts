import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface User {
  userId: string;
  username: string;
  name: string;
  avatarUrl: string;
}

export const followListApi = createApi({
  reducerPath: 'followListApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['FollowList'],
  endpoints: (builder) => ({
    fetchFollowers: builder.query<User[], { userId: string; page: number }>({
      queryFn: async ({ userId, page }) => {
        try {
          const pageSize = 5; // 한 번에 가져올 데이터 개수
          const { data, error } = await supabase
            .from('user_follow')
            .select(
              `
              follower_id (id, username, name, avatar_url)
            `,
            )
            .eq('following_id', userId)
            .range((page - 1) * pageSize, page * pageSize - 1);

          if (error) throw error;

          const followers = data.map((item: any) => ({
            userId: item.follower_id.id,
            username: item.follower_id.username,
            name: item.follower_id.name,
            avatarUrl: item.follower_id.avatar_url,
          }));

          return { data: followers };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? result.map(({ userId }) => ({ type: 'FollowList', id: userId }))
          : [],
    }),

    fetchFollowings: builder.query<User[], { userId: string; page: number }>({
      queryFn: async ({ userId, page }) => {
        try {
          const pageSize = 5; // 한 번에 가져올 데이터 개수
          const { data, error } = await supabase
            .from('user_follow')
            .select(
              `
              following_id (id, username, name, avatar_url)
            `,
            )
            .eq('follower_id', userId)
            .range((page - 1) * pageSize, page * pageSize - 1);

          if (error) throw error;

          const followings = data.map((item: any) => ({
            userId: item.following_id.id,
            username: item.following_id.username,
            name: item.following_id.name,
            avatarUrl: item.following_id.avatar_url,
          }));

          return { data: followings };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? result.map(({ userId }) => ({ type: 'FollowList', id: userId }))
          : [],
    }),
  }),
});

export const { useFetchFollowersQuery, useFetchFollowingsQuery } =
  followListApi;
