import { Post } from '@components/BookDetailPage/BookReviewTab';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '@shared/types/type';

type FeedType = 'review' | 'post';

export const userFeedsApi = createApi({
  reducerPath: 'userFeedsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    /* TODO - Post 타입 통일되면 공통 타입으로 빼낼 예정 */
    getUserFeeds: builder.query<
      {
        reviews: Review[];
        posts: Post[];
      },
      string
    >({
      query: (userId) => `user/${userId}/feeds`,
    }),
    getUserPaginatedFeeds: builder.query<
      { feeds: Post[]; totalFeeds: number },
      { userId: string; feedType: FeedType; page: number }
    >({
      query: ({ userId, feedType, page }) =>
        `user/${userId}/feeds/${feedType}?page=${page}`,
    }),
    getLikedFeeds: builder.query<
      {
        reviews: Review[];
        posts: Post[];
      },
      string
    >({
      query: (userId) => `user/${userId}/feeds/liked`,
    }),
    getLikedPaginatedFeeds: builder.query<
      { feeds: Post[]; totalFeeds: number },
      { userId: string; feedType: FeedType; page: number }
    >({
      query: ({ userId, feedType, page }) =>
        `user/${userId}/feeds/liked/${feedType}?page=${page}`,
    }),
  }),
});

export const {
  useGetUserFeedsQuery,
  useGetUserPaginatedFeedsQuery,
  useGetLikedFeedsQuery,
  useGetLikedPaginatedFeedsQuery,
} = userFeedsApi;
