import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OneLineReviewRequest, OneLineReviewResponse } from '../types/types';
import { feedApi } from '@features/FeedPage/api/feedApi';

export const oneLineReviewApi = createApi({
  reducerPath: 'oneLineReviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts'] as const,
  endpoints: (builder) => ({
    createOneLineReview: builder.mutation<
      OneLineReviewResponse,
      OneLineReviewRequest
    >({
      query: (body) => ({
        url: '/posts/one-line-review',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // 피드 데이터 리페치
          dispatch(feedApi.util.invalidateTags([{ type: 'Posts' }]));
          // 또는 window.location.reload(); // 페이지 리로드
        } catch (error) {
          console.error('한줄평 작성 실패:', error);
        }
      },
    }),
  }),
});

export const { useCreateOneLineReviewMutation } = oneLineReviewApi;
