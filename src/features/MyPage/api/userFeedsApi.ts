import {
  OneLineReview,
  Posting,
  UserPostingReviewCounts,
} from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import {
  DbOneLineReview,
  DbPosting,
  DbUserPostingReviewCounts,
} from '../types/types';

export const userFeedsApi = createApi({
  reducerPath: 'userFeedsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserFeeds'],
  endpoints: (builder) => ({
    getAllOneLineReviews: builder.query<
      OneLineReview[],
      { username: string; page: number; limit: number }
    >({
      async queryFn({ username, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('user_all_one_line_reviews')
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
        { type: 'UserFeeds', id: `AllOneLineReviews-${username}` },
      ],
    }),

    getAllPostings: builder.query<
      Posting[],
      { username: string; page: number; limit: number }
    >({
      async queryFn({ username, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('user_all_postings')
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
        { type: 'UserFeeds', id: `AllPostings-${username}` },
      ],
    }),

    getLatestOneLineReviews: builder.query<OneLineReview[], { userId: string }>(
      {
        async queryFn({ userId }) {
          try {
            const { data, error } = await supabase
              .from('latest_user_one_line_reviews')
              .select('*')
              .eq('user_id', userId);

            if (error) throw error;

            const dbReviews = data[0]?.latest_reviews || [];
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
          { type: 'UserFeeds', id: `OneLineReviews-${userId}` },
        ],
      },
    ),

    getLatestPostings: builder.query<Posting[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = await supabase
            .from('latest_user_postings')
            .select('*')
            .eq('user_id', userId);

          if (error) throw error;

          const dbPostings = data[0]?.latest_postings || [];
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
        { type: 'UserFeeds', id: `Postings-${userId}` },
      ],
    }),

    getUserPostingReviewCounts: builder.query<
      UserPostingReviewCounts,
      { username: string }
    >({
      async queryFn({ username }) {
        try {
          const { data, error } = await supabase
            .from('user_posting_review_counts')
            .select('*')
            .eq('username', username);

          if (error) throw error;

          const dbCounts = data[0] as DbUserPostingReviewCounts;
          return {
            data: {
              userId: dbCounts.user_id,
              totalPostingsCount: dbCounts.total_postings_count,
              totalReviewsCount: dbCounts.total_reviews_count,
            },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { username }) => [
        { type: 'UserFeeds', id: `Counts-${username}` },
      ],
    }),

    deletePosts: builder.mutation<void, string[]>({
      async queryFn(postIds) {
        try {
          const { error } = await supabase
            .from('post')
            .delete()
            .in('id', postIds);

          if (error) throw error;

          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: 'UserFeeds' }],
    }),
  }),
});

export const {
  useGetAllOneLineReviewsQuery,
  useGetAllPostingsQuery,
  useGetLatestOneLineReviewsQuery,
  useGetLatestPostingsQuery,
  useGetUserPostingReviewCountsQuery,
  useDeletePostsMutation,
} = userFeedsApi;
