import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';
import { DbFollowerData, DbFollowingData } from '../types/types';
import { User } from '@shared/types/type';

export const followListApi = createApi({
  reducerPath: 'followListApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['FollowList'],
  endpoints: (builder) => ({
    fetchFollowers: builder.query<User[], { userId: string; page: number }>({
      queryFn: async ({ userId, page }) => {
        try {
          const limit = 5;
          const offset = (page - 1) * limit;
          const { data, error } = (await supabase
            .from('user_follow')
            .select(
              `
              follower_id (id, username, name, avatar_url)
            `,
            )
            .eq('following_id', userId)
            .range(
              offset,
              offset + limit - 1,
            )) as PostgrestResponse<DbFollowerData>;

          if (error) throw error;

          // 데이터 매핑
          const followers = data.map((item) => ({
            id: item.follower_id.id,
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
        result ? result.map(({ id }) => ({ type: 'FollowList', id })) : [],
    }),

    // 팔로잉 목록 조회
    fetchFollowings: builder.query<User[], { userId: string; page: number }>({
      queryFn: async ({ userId, page }) => {
        try {
          const limit = 5; // 한 번에 가져올 데이터 개수
          const offset = (page - 1) * limit;
          const { data, error } = (await supabase
            .from('user_follow')
            .select(
              `
              following_id (id, username, name, avatar_url)
            `,
            )
            .eq('follower_id', userId)
            .range(
              offset,
              offset + limit - 1,
            )) as PostgrestResponse<DbFollowingData>;

          if (error) throw error;

          // 데이터 매핑
          const followings = data.map((item) => ({
            id: item.following_id.id,
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
        result ? result.map(({ id }) => ({ type: 'FollowList', id })) : [],
    }),
  }),
});

export const { useFetchFollowersQuery, useFetchFollowingsQuery } =
  followListApi;
