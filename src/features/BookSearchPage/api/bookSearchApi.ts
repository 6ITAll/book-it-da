import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';
import {
  BookResponse,
  SearchBooksParams,
  RatingInfoResponse,
} from '@features/BookSearchPage/types/types';

export const bookSearchApi = createApi({
  reducerPath: 'bookSearchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: aladinConfig.aladinBaseUrl,
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
          start: (page - 1) * 4 + 1, // 현재 페이지에 따른 시작 인덱스 계산
          Sort: sort,
          SearchTarget: 'Book',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        },
      }),
    }),
    // 상품조회 Lookup_url 에 평가한 사람의 수 가져오기 위한 api
    fetchRatingInfo: builder.query<RatingInfoResponse, { itemId: number }>({
      query: ({ itemId }) => ({
        url: aladinConfig.itemLookUpUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          ItemId: itemId,
          ItemIdType: 'ItemId',
          OptResult: 'ratingInfo',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        },
      }),
    }),
  }),
});

export const { useSearchBooksQuery, useFetchRatingInfoQuery } = bookSearchApi;
