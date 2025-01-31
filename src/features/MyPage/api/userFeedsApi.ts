import { OneLineReview, Posting } from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

interface UserPostingReviewCountsResponse {
  user_id: string;
  total_postings_count: number;
  total_reviews_count: number;
}

export const userFeedsApi = createApi({
  reducerPath: 'userFeedsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserFeeds'],
  endpoints: (builder) => ({
    getLatestOneLineReviews: builder.query<OneLineReview[], { userId: string }>(
      {
        async queryFn({ userId }) {
          try {
            const { data, error } = (await supabase
              .from('latest_user_one_line_reviews')
              .select('*')
              .eq('user_id', userId)) as PostgrestResponse<{
              user_id: string;
              latest_reviews: OneLineReview[];
            }>;

            if (error) throw error;

            return { data: data[0]?.latest_reviews || [] };
          } catch (error) {
            return { error };
          }
        },
        providesTags: (_, __, { userId }) => [
          { type: 'UserFeeds', id: `OneLineReviews-${userId}` },
        ],
      },
    ),

    getLatestPostings: builder.query<Posting[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_postings')
            .select('*')
            .eq('user_id', userId)) as PostgrestResponse<{
            user_id: string;
            latest_postings: Posting[];
          }>;

          if (error) throw error;

          return { data: data[0]?.latest_postings || [] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserFeeds', id: `Postings-${userId}` },
      ],
    }),

    getUserPostingReviewCounts: builder.query<
      UserPostingReviewCountsResponse,
      { userId: string }
    >({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('user_posting_review_counts')
            .select('*')
            .eq(
              'user_id',
              userId,
            )) as PostgrestResponse<UserPostingReviewCountsResponse>;

          if (error) throw error;

          return { data: data[0] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserFeeds', id: `Counts-${userId}` },
      ],
    }),
  }),
});

export const {
  useGetLatestOneLineReviewsQuery,
  useGetLatestPostingsQuery,
  useGetUserPostingReviewCountsQuery,
} = userFeedsApi;
