import { Post } from '@components/BookDetailPage/BookReviewTab';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '@shared/types/type';

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
    getLikedFeeds: builder.query<
      {
        reviews: Review[];
        posts: Post[];
      },
      string
    >({
      query: (userId) => `user/${userId}/feeds/liked`,
    }),
  }),
});

export const { useGetUserFeedsQuery, useGetLikedFeedsQuery } = userFeedsApi;
