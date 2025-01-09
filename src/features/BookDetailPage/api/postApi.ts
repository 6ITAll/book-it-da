import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookDetailPost } from '@shared/types/type';
import { PostResponse } from '@features/BookDetailPage/types/types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // 책 상세페이지에서 상위 3개만 조회
    getPosts: builder.query<PostResponse, number>({
      query: (itemId) => `posts/book/top/${itemId}`,
    }),
    // 포스트 더보기 페이지에서 페이지네이션 기반 포스트 조회
    getPaginatedPosts: builder.query<
      { posts: BookDetailPost[]; totalPosts: number },
      { itemId: number; page: number }
    >({
      query: ({ itemId, page }) => `posts/book/${itemId}?page=${page}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPaginatedPostsQuery } = postApi;
