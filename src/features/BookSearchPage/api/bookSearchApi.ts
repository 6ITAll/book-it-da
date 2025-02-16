import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';
import {
  BookResponse,
  RatingInfoResponse,
} from '@features/BookSearchPage/types/types';
import { SortOption } from '@features/BookSearchPage/Slice/bookSearchSlice';

export interface SearchBooksParams {
  query: string;
  sort: SortOption;
  page?: number;
}

export const bookSearchApi = createApi({
  reducerPath: 'bookSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: aladinConfig.aladinBaseUrl }),
  endpoints: (builder) => ({
    // 단 한 번의 호출로 최대 50개의 결과를 가져와 { allBooks, totalResults }로 반환
    searchBooks: builder.query<
      { allBooks: BookResponse['item']; totalResults: number },
      SearchBooksParams
    >({
      async queryFn({ query, sort }, _queryApi, _extraOptions, fetchWithBQ) {
        const params = {
          ttbkey: aladinConfig.aladinApiKey,
          Query: query,
          QueryType: 'Title',
          MaxResults: 50, // 항상 50개
          start: 1,
          Sort: sort,
          SearchTarget: 'Book',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        };

        const result = await fetchWithBQ({
          url: aladinConfig.itemSearchUrl,
          params,
        });
        if (result.error) return { error: result.error };

        const data = result.data as BookResponse;
        const totalResults = Number(data.totalResults) || 0;
        const allBooks = data.item ?? [];

        return { data: { allBooks, totalResults } };
      },
    }),
    fetchRatingInfo: builder.query<RatingInfoResponse, { isbn: string }>({
      query: ({ isbn }) => ({
        url: aladinConfig.itemLookUpUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          ItemId: isbn,
          ItemIdType: 'ISBN',
          OptResult: 'ratingInfo',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        },
      }),
    }),
  }),
});

export const { useSearchBooksQuery, useFetchRatingInfoQuery } = bookSearchApi;
