import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

interface LikedOneLineReviewResponse {
  post_id: string;
  review: string;
  rating: number | null;
  isbn: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

interface LikedPostingResponse {
  post_id: string;
  title: string;
  content: string;
  isbn: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export const userLikedFeedsApi = createApi({
  reducerPath: 'userLikedFeedsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getLikedOneLineReviews: builder.query<
      LikedOneLineReviewResponse[],
      { userId: string }
    >({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_liked_one_line_reviews')
            .select('*')
            .eq('liker_user_id', userId)) as PostgrestResponse<{
            liker_user_id: string;
            liked_reviews: LikedOneLineReviewResponse[];
          }>;

          if (error) throw error;

          return { data: data[0]?.liked_reviews || [] };
        } catch (error) {
          return { error };
        }
      },
    }),

    getLikedPostings: builder.query<LikedPostingResponse[], { userId: string }>(
      {
        async queryFn({ userId }) {
          try {
            const { data, error } = (await supabase
              .from('latest_user_liked_postings')
              .select('*')
              .eq('liker_user_id', userId)) as PostgrestResponse<{
              liker_user_id: string;
              liked_postings: LikedPostingResponse[];
            }>;

            if (error) throw error;

            return { data: data[0]?.liked_postings || [] };
          } catch (error) {
            return { error };
          }
        },
      },
    ),
  }),
});

export const { useGetLikedOneLineReviewsQuery, useGetLikedPostingsQuery } =
  userLikedFeedsApi;
