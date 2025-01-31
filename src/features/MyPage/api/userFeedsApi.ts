import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

// 최신 한줄평 응답 타입
interface OneLineReviewResponse {
  post_id: string;
  review: string;
  rating: number | null;
  isbn: string;
  created_at: string;
  like_count: number; // 좋아요 개수 추가
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

// 최신 포스팅 응답 타입
interface PostingResponse {
  post_id: string;
  title: string;
  content: string;
  isbn: string;
  created_at: string;
  like_count: number; // 좋아요 개수 추가
  author: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

interface UserPostingReviewCountsResponse {
  user_id: string;
  total_postings_count: number;
  total_reviews_count: number;
}

export const userFeedsApi = createApi({
  reducerPath: 'userFeedsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['UserFeeds'], // 태그 추가
  endpoints: (builder) => ({
    getLatestOneLineReviews: builder.query<
      OneLineReviewResponse[],
      { userId: string }
    >({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_one_line_reviews') // 뷰 이름
            .select('*') // 뷰의 모든 데이터를 가져옴
            .eq('user_id', userId)) as PostgrestResponse<{
            user_id: string;
            latest_reviews: OneLineReviewResponse[];
          }>;

          if (error) throw error;

          return { data: data[0]?.latest_reviews || [] }; // 최신 리뷰 배열 반환
        } catch (error) {
          return { error }; // 에러 발생 시 반환
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserFeeds', id: `OneLineReviews-${userId}` },
      ], // 태그 설정
    }),

    getLatestPostings: builder.query<PostingResponse[], { userId: string }>({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('latest_user_postings') // 뷰 이름
            .select('*') // 뷰의 모든 데이터를 가져옴
            .eq('user_id', userId)) as PostgrestResponse<{
            user_id: string;
            latest_postings: PostingResponse[];
          }>;

          if (error) throw error;

          return { data: data[0]?.latest_postings || [] }; // 최신 포스팅 배열 반환
        } catch (error) {
          return { error }; // 에러 발생 시 반환
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserFeeds', id: `Postings-${userId}` },
      ], // 태그 설정
    }),

    getUserPostingReviewCounts: builder.query<
      UserPostingReviewCountsResponse,
      { userId: string }
    >({
      async queryFn({ userId }) {
        try {
          const { data, error } = (await supabase
            .from('user_posting_review_counts') // 뷰 이름
            .select('*') // 모든 데이터를 가져옴
            .eq(
              'user_id',
              userId,
            )) as PostgrestResponse<UserPostingReviewCountsResponse>;

          if (error) throw error;

          return { data: data[0] }; // 첫 번째 데이터 반환 (단일 사용자)
        } catch (error) {
          return { error }; // 에러 발생 시 반환
        }
      },
      providesTags: (_, __, { userId }) => [
        { type: 'UserFeeds', id: `Counts-${userId}` },
      ], // 태그 설정
    }),
  }),
});

export const {
  useGetLatestOneLineReviewsQuery,
  useGetLatestPostingsQuery,
  useGetUserPostingReviewCountsQuery,
} = userFeedsApi;
