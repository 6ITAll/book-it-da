import { OneLineReview, Posting } from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

export interface UserLikedCountsResponse {
  user_id: string;
  total_liked_postings_count: number;
  total_liked_reviews_count: number;
}

export const userLikedFeedsApi = createApi({
  reducerPath: 'userLikedFeedsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserLikedFeeds'],
  endpoints: (builder) => ({
    getLikedOneLineReviews: builder.query<OneLineReview[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_liked_one_line_reviews')
            .select('*')
            .eq('liker_user_id', userId)) as PostgrestResponse<{
            liker_user_id: string;
            liked_reviews: OneLineReview[];
          }>;

          if (error) throw error;

          return { data: data[0]?.liked_reviews || [] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserLikedFeeds', id: `OneLineReviews-${userId}` },
      ],
    }),

    getLikedPostings: builder.query<Posting[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_liked_postings')
            .select('*')
            .eq('liker_user_id', userId)) as PostgrestResponse<{
            liker_user_id: string;
            liked_postings: Posting[];
          }>;

          if (error) throw error;

          return { data: data[0]?.liked_postings || [] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserLikedFeeds', id: `OneLineReviews-${userId}` },
      ],
    }),
    getUserLikedCounts: builder.query<
      UserLikedCountsResponse,
      { userId: string }
    >({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('user_liked_posting_review_counts')
            .select('*')
            .eq(
              'user_id',
              userId,
            )) as PostgrestResponse<UserLikedCountsResponse>;

          if (error) throw error;

          return { data: data[0] || null };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserLikedFeeds', id: `OneLineReviews-${userId}` },
      ],
    }),
  }),
});

export const {
  useGetLikedOneLineReviewsQuery,
  useGetLikedPostingsQuery,
  useGetUserLikedCountsQuery,
} = userLikedFeedsApi;
