import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { aladinConfig } from '@shared/config/aladinConfig';

export interface BookDetailResponse {
  item: Array<{
    itemId: number;
    title: string;
    description: string;
    author: string;
    categoryName: string;
    pubDate: string;
    cover: string;
    link: string;
    customerReviewRank?: number;
    subInfo: {
      subTitle: string;
      ratingInfo?: {
        ratingCount: number;
      };
    };
  }>;
}

export const bookDetailApi = createApi({
  reducerPath: 'bookDetailApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
