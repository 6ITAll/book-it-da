import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';
import { BestBookResponse } from '@features/BookSearchPage/types/types';

export const bestBookGetApi = createApi({
  reducerPath: 'bestBookGetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
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
