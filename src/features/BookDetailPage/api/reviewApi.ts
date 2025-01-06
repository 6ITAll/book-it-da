import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '@shared/types/type';

export interface ReviewResponse {
  totalReviews: number;
  topReviews: Review[];
}

export interface PaginatedReviewResponse {
  reviews: Review[];
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // 최상위 3개 리뷰 및 총 리뷰 개수
    getReviews: builder.query<ReviewResponse, number>({
      query: (itemId) => `reviews/top/${itemId}`,
    }),
    // 페이지네이션 기반으로 모든 리뷰 반환
    getPaginatedReviews: builder.query<
      PaginatedReviewResponse,
      { itemId: number; page: number }
    >({
      query: ({ itemId, page }) => `reviews/${itemId}?page=${page}`,
    }),
  }),
});

export const { useGetReviewsQuery, useGetPaginatedReviewsQuery } = reviewApi;
