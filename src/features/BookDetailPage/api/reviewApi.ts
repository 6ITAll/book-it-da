import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReviewResponse } from '@features/BookDetailPage/types/types';
import { PaginatedReviewResponse } from '@features/BookDetailPage/types/types';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // 최상위 3개 리뷰 및 총 리뷰 개수
    getReviews: builder.query<ReviewResponse, string>({
      query: (isbn) => `reviews/top/${isbn}`,
    }),
    // 페이지네이션 기반으로 모든 리뷰 반환
    getPaginatedReviews: builder.query<
      PaginatedReviewResponse,
      { isbn: string; page: number }
    >({
      query: ({ isbn, page }) => `reviews/${isbn}?page=${page}`,
    }),
  }),
});

export const { useGetReviewsQuery, useGetPaginatedReviewsQuery } = reviewApi;
