import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';

export interface BookbyIsbnResponse {
  title: string;
  author: string;
  cover: string;
}

export const bookSearchByIsbnApi = createApi({
  reducerPath: 'bookSearchByIsbnApi',
  baseQuery: fetchBaseQuery({
    baseUrl: aladinConfig.aladinBaseUrl,
  }),
  endpoints: (builder) => ({
    searchBookByIsbn: builder.query<BookbyIsbnResponse, { isbn: string }>({
      query: ({ isbn }) => ({
        url: aladinConfig.itemLookUpUrl,
        params: {
          ttbkey: aladinConfig.aladinApiKey,
          ItemId: isbn,
          ItemIdType: 'ISBN',
          output: aladinConfig.defaultOutput,
          Version: aladinConfig.version,
        },
      }),
      transformResponse: (response: {
        item: BookbyIsbnResponse;
      }): BookbyIsbnResponse => {
        return response.item;
      },
    }),
  }),
});

// React 컴포넌트에서 사용할 수 있는 훅 생성
export const { useSearchBookByIsbnQuery } = bookSearchByIsbnApi;
