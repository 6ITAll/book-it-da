import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';

// API 응답 타입 (이미지와 링크만 포함)
export interface BestBookResponse {
  item: Array<{
    itemId: number;
    cover: string; // 책 이미지 URL
    link: string; // 책 상세 페이지 링크
    title: string; // 책 제목
  }>;
}

export const bestBookGetApi = createApi({
  reducerPath: 'bestBookGetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Vite 프록시가 중계
  }),
  endpoints: (builder) => ({
    getBestBooks: builder.query<BestBookResponse, void>({
      query: () => ({
        url: aladinConfig.itemListUrl,
        params: {
          ttbkey: aladinConfig.ttbKey,
          QueryType: 'Bestseller', // 베스트셀러 조회
          MaxResults: 10, // 최대 10개 결과 반환
          start: 1,
          SearchTarget: 'Book', // 책만 검색
          output: 'js', // JSON 형식
          Version: aladinConfig.version,
        },
      }),
    }),
  }),
});

export const { useGetBestBooksQuery } = bestBookGetApi;
