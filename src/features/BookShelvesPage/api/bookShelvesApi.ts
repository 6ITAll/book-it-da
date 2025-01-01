import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetBookshelfParams,
  GetBookshelfResponse,
  UpdateReadingStatusRequest,
} from '../types/types';

export const bookShelvesApi = createApi({
  reducerPath: 'bookshelvesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Bookshelf'],
  endpoints: (builder) => ({
    getBookshelf: builder.query<GetBookshelfResponse, GetBookshelfParams>({
      query: ({ userId, bookshelfId }) =>
        `/users/${userId}/bookshelves/${bookshelfId}`,
      providesTags: ['Bookshelf'],
    }),
    updateReadingStatus: builder.mutation<void, UpdateReadingStatusRequest>({
      query: ({ userId, bookshelfId, bookId, readingStatus }) => ({
        url: `/users/${userId}/bookshelves/${bookshelfId}/books/${bookId}/status`,
        method: 'PATCH',
        body: { readingStatus },
      }),
      invalidatesTags: ['Bookshelf'],
    }),
  }),
});

export const { useGetBookshelfQuery, useUpdateReadingStatusMutation } =
  bookShelvesApi;
