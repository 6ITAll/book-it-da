import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';
import { BookDetailResponse } from '@features/BookSearchPage/types/types';

export const bookDetailApi = createApi({
  reducerPath: 'bookDetailApi',
  baseQuery: fetchBaseQuery({ baseUrl: aladinConfig.aladinBaseUrl }),
  endpoints: (builder) => ({
    fetchBookDetail: builder.query<BookDetailResponse, { isbn: string }>({
      query: ({ isbn }) => ({
        url: aladinConfig.itemLookUpUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          ItemId: isbn,
          ItemIdType: 'ISBN',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
          Cover: 'Big',
          OptResult: 'ratingInfo',
        },
      }),
    }),
  }),
});

export const { useFetchBookDetailQuery } = bookDetailApi;
