import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '@shared/types/type';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], number>({
      query: (itemId) => `reviews/${itemId}`,
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApi;
