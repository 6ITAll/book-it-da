import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@/shared/config/aladinConfig';

// 알라딘 상품 검색 Api 관련 인터페이스
export interface BookResponse {
  version: string;
  totalResults: number;
  item: Array<{
    itemId: number; // 상품 고유 번호
    title: string; // 제목
    author: string; // 저자
    cover: string; // 이미지
    priceStandard: number; // 정가 가격
    customerReviewRank: number; // 리뷰 점수
    link: string; // 알라딘 페이지 링크
  }>;
}

// 요청 파라미터 타입 정의
export interface SearchBooksParams {
  query: string; // 사용자 검색어
  page: number; // 페이지 넘버
  sort: string; // 정렬 기준
}

// 상품 조회 관련 인터페이스
export interface RatingInfoResponse {
  item: Array<{
    subInfo?: {
      ratingInfo?: {
        ratingCount: number; // 평가 인원 수
      };
    };
  }>;
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
