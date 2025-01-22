import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

interface FollowResponse {
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
          .single();

        if (error) {
          // 결과가 없는 경우
          if (error.code === 'PGRST116') {
            return { data: { isFollowing: false } };
          }
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
        const { data: existingFollow, error: checkError } = await supabase
          .from('user_follow')
          .select('*')
          .eq('follower_id', session.session?.user.id)
          .eq('following_id', userId)
          .single();

        if (checkError && checkError.code !== 'PGRST116') {
          return { error: { status: 500, data: checkError.message } };
        }

        if (existingFollow) {
          const { error: deleteError } = await supabase
            .from('user_follow')
            .delete()
            .eq('follower_id', session.session?.user.id)
            .eq('following_id', userId);

          if (deleteError) {
            return { error: { status: 500, data: deleteError.message } };
          }
          return { data: { isFollowing: false } };
        } else {
          const { error: insertError } = await supabase
            .from('user_follow')
            .insert({
              follower_id: session.session?.user.id,
              following_id: userId,
            });

          if (insertError) {
            return { error: { status: 500, data: insertError.message } };
          }
          return { data: { isFollowing: true } };
        }
      },
      invalidatesTags: (_, __, userId) => [
        { type: 'Follow' as const, id: userId },
      ],
    }),
  }),
});

export const { useCheckFollowStatusQuery, useToggleFollowMutation } = followApi;
