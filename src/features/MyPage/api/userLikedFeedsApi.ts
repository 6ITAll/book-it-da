import {
  OneLineReview,
  Posting,
  UserLikedCountsResponse,
} from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { DbOneLineReview, DbPosting, DbUserLikedCounts } from '../types/types';

export const userLikedFeedsApi = createApi({
  reducerPath: 'userLikedFeedsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserLikedFeeds'],
  endpoints: (builder) => ({
    getLikedOneLineReviews: builder.query<
      OneLineReview[],
      { username: string; page: number; limit: number }
    >({
      async queryFn({ username, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('user_liked_one_line_reviews')
            .select('*')
            .eq('username', username)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          if (error) throw error;

          const reviews: OneLineReview[] = (data as DbOneLineReview[]).map(
            (review) => ({
              postId: review.post_id,
              review: review.review,
              rating: review.rating,
              book: review.book,
              createdAt: review.created_at,
              user: {
                id: review.user.id,
                username: review.user.username,
                avatarUrl: review.user.avatar_url,
              },
            }),
          );

          return { data: reviews };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { username }) => [
        { type: 'UserLikedFeeds', id: `LikedOneLineReviews-${username}` },
      ],
    }),

    getLikedPostings: builder.query<
      Posting[],
      { username: string; page: number; limit: number }
    >({
      async queryFn({ username, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('user_liked_postings')
            .select('*')
            .eq('username', username)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          if (error) throw error;

          const postings: Posting[] = (data as DbPosting[]).map((posting) => ({
            postId: posting.post_id,
            title: posting.title,
            content: posting.content,
            book: posting.book,
            createdAt: posting.created_at,
            user: {
              id: posting.user.id,
              username: posting.user.username,
              avatarUrl: posting.user.avatar_url,
            },
          }));

          return { data: postings };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { username }) => [
        { type: 'UserLikedFeeds', id: `LikedPostings-${username}` },
      ],
    }),

    getLatestLikedReviews: builder.query<OneLineReview[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = await supabase
            .from('latest_user_liked_one_line_reviews')
            .select('*')
            .eq('liker_user_id', userId);

          if (error) throw error;

          const dbReviews = data[0]?.liked_reviews || [];
          const reviews: OneLineReview[] = dbReviews.map(
            (review: DbOneLineReview) => ({
              postId: review.post_id,
              review: review.review,
              rating: review.rating,
              book: review.book,
              createdAt: review.created_at,
              user: {
                id: review.user.id,
                username: review.user.username,
                avatarUrl: review.user.avatar_url,
              },
            }),
          );

          return { data: reviews };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserLikedFeeds', id: `OneLineReviews-${userId}` },
      ],
    }),

    getLatestLikedPostings: builder.query<Posting[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = await supabase
            .from('latest_user_liked_postings')
            .select('*')
            .eq('liker_user_id', userId);

          if (error) throw error;

          const dbPostings = data[0]?.liked_postings || [];
          const postings: Posting[] = dbPostings.map((posting: DbPosting) => ({
            postId: posting.post_id,
            title: posting.title,
            content: posting.content,
            book: posting.book,
            createdAt: posting.created_at,
            user: {
              id: posting.user.id,
              username: posting.user.username,
              avatarUrl: posting.user.avatar_url,
            },
          }));

          return { data: postings };
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
      { username: string }
    >({
      async queryFn({ username }) {
        try {
          const { data, error } = await supabase
            .from('user_liked_posting_review_counts')
            .select('*')
            .eq('username', username);

          if (error) throw error;

          const dbCounts = data[0] as DbUserLikedCounts;
          return {
            data: {
              userId: dbCounts.user_id,
              totalLikedPostingsCount: dbCounts.total_liked_postings_count,
              totalLikedReviewsCount: dbCounts.total_liked_reviews_count,
            },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { username }) => [
        { type: 'UserLikedFeeds', id: `OneLineReviews-${username}` },
      ],
    }),
  }),
});

export const {
  useGetLikedOneLineReviewsQuery,
  useGetLikedPostingsQuery,
  useGetLatestLikedReviewsQuery,
  useGetLatestLikedPostingsQuery,
  useGetUserLikedCountsQuery,
} = userLikedFeedsApi;
