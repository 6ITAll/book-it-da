import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface FollowResponse {
  isFollowing: boolean;
}

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Follow'] as const,
  endpoints: (builder) => ({
    checkFollowStatus: builder.query<FollowResponse, string>({
      queryFn: async (userId) => {
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
          return { error: { status: 401, data: 'Not authenticated' } };
        }
        const { data, error } = await supabase
          .from('user_follow')
          .select('*')
          .eq('follower_id', session.session?.user.id)
          .eq('following_id', userId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          return { error: { status: 500, data: error.message } };
        }
        return { data: { isFollowing: !!data } };
      },
      providesTags: (_, __, userId) => [{ type: 'Follow', id: userId }],
    }),

    toggleFollow: builder.mutation<FollowResponse, string>({
      queryFn: async (userId) => {
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
          return { error: { status: 401, data: 'Not authenticated' } };
        }
        const followerId = session.session?.user.id;

        const { data, error } = await supabase.rpc('toggle_follow', {
          p_follower_id: followerId,
          p_following_id: userId,
        });

        if (error) {
          return { error: { status: 500, data: error.message } };
        }
        return { data: { isFollowing: data } };
      },
      invalidatesTags: (_, __, userId) => [{ type: 'Follow', id: userId }],
    }),
  }),
});

export const { useCheckFollowStatusQuery, useToggleFollowMutation } = followApi;
