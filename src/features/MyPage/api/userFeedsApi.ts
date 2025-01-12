import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookDetailPost, Review } from '@shared/types/type';

type FeedType = 'review' | 'post';

export const userFeedsApi = createApi({
  reducerPath: 'userFeedsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUserFeeds: builder.query<
      {
        reviews: Review[];
        posts: BookDetailPost[];
      },
      string
    >({
      query: (userId) => `user/${userId}/feeds`,
    }),
    getUserPaginatedFeeds: builder.query<
      { feeds: BookDetailPost[]; totalFeeds: number },
      { userId: string; feedType: FeedType; page: number }
    >({
      query: ({ userId, feedType, page }) =>
        `user/${userId}/feeds/${feedType}?page=${page}`,
    }),
    getLikedFeeds: builder.query<
      {
        reviews: Review[];
        posts: BookDetailPost[];
      },
      string
    >({
      query: (userId) => `user/${userId}/feeds/liked`,
    }),
    getLikedPaginatedFeeds: builder.query<
      { feeds: BookDetailPost[]; totalFeeds: number },
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
