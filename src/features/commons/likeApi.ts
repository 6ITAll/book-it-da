import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface LikeResponse {
  isLiked: boolean;
  likeCount: number;
}

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Like'] as const,
  endpoints: (builder) => ({
    checkLikeStatus: builder.query<LikeResponse, string>({
      queryFn: async (postId) => {
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
          return { error: { status: 401, data: 'Not authenticated' } };
        }

        const userId = session.session?.user.id;

        const { data, error } = await supabase
          .from('post_like')
          .select('*', { count: 'exact' })
          .eq('post_id', postId);

        if (error) {
          return { error: { status: 500, data: error.message } };
        }

        const isLiked = data.some((like) => like.user_id === userId);
        const likeCount = data.length;

        return {
          data: {
            isLiked,
            likeCount,
          },
        };
      },
      providesTags: (_, __, postId) => [{ type: 'Like', id: postId }],
    }),
    toggleLike: builder.mutation<LikeResponse, string>({
      queryFn: async (postId) => {
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
          return { error: { status: 401, data: 'Not authenticated' } };
        }

        const userId = session.session?.user.id;

        const { data, error } = await supabase.rpc('toggle_like', {
          p_post_id: postId,
          p_user_id: userId,
        });

        if (error) {
          return { error: { status: 500, data: error.message } };
        }

        return {
          data: {
            isLiked: data.is_liked,
            likeCount: data.like_count,
          },
        };
      },
      invalidatesTags: (_, __, postId) => [{ type: 'Like', id: postId }],
    }),
  }),
});

export const { useCheckLikeStatusQuery, useToggleLikeMutation } = likeApi;
