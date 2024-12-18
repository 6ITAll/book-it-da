import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@/shared/config/aladinConfig';
// Book API 응답 타입
export interface BookResponse {
  version: string;
  totalResults: number;
  item: Array<{
    itemId: number;
    title: string;
    author: string;
    cover: string;
    priceStandard: number;
    customerReviewRank: number;
    link: string;
  }>;
}

// 요청 파라미터 타입 정의
export interface SearchBooksParams {
  query: string; // 사용자 검색어
  page: number; // 페이지 넘버
  sort: string; // 정렬 기준
}

export const bookSearchApi = createApi({
  reducerPath: 'bookSearchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    searchBooks: builder.query<BookResponse, SearchBooksParams>({
      query: ({ query, page, sort }) => ({
        url: aladinConfig.itemSearchUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          Query: query,
          QueryType: 'Title',
          MaxResults: 4,
          start: (page - 1) * 4 + 1, // 페이지에 따른 시작 인덱스 계산
          Sort: sort,
          SearchTarget: 'Book',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        },
      }),
    }),
  }),
});

export const { useSearchBooksQuery } = bookSearchApi;
