import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

// 사용자 정보 인터페이스
export interface User {
  userId: string;
  username: string;
  name: string;
  avatarUrl: string;
  isFollowing?: boolean;
}

interface FollowerData {
  follower_id: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
  };
}

interface FollowingData {
  following_id: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
  };
}

export const followListApi = createApi({
  reducerPath: 'followListApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['FollowList'],
  endpoints: (builder) => ({
    // 팔로워 목록 조회
    fetchFollowers: builder.query<User[], { userId: string; page: number }>({
      queryFn: async ({ userId, page }) => {
        try {
          const limit = 5; // 한 번에 가져올 데이터 개수
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
            )) as PostgrestResponse<FollowerData>;

          if (error) throw error;

          // 데이터 매핑
          const followers = data.map((item) => ({
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
            )) as PostgrestResponse<FollowingData>;

          if (error) throw error;

          // 데이터 매핑
          const followings = data.map((item) => ({
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
