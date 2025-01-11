import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';
import { BookDetailResponse } from '@features/BookSearchPage/types/types';

export const bookDetailApi = createApi({
  reducerPath: 'bookDetailApi',
  baseQuery: fetchBaseQuery({ baseUrl: aladinConfig.aladinBaseUrl }),
  endpoints: (builder) => ({
    fetchBookDetail: builder.query<BookDetailResponse, { itemId: number }>({
      query: ({ itemId }) => ({
        url: aladinConfig.itemLookUpUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          ItemId: itemId,
          ItemIdType: 'ItemId',
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
