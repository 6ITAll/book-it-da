import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBookshelfResponse } from '../types/types';
import { ReadingStatusType } from '@shared/types/type';

export const bookShelvesApi = createApi({
  reducerPath: 'bookshelvesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Bookshelf'],
  endpoints: (builder) => ({
    getBookshelf: builder.query<
      GetBookshelfResponse,
      { userId: number; bookshelfId: number }
    >({
      query: ({ userId, bookshelfId }) =>
        `/users/${userId}/bookshelves/${bookshelfId}`,
      providesTags: ['Bookshelf'],
    }),
    updateReadingStatus: builder.mutation<
      void,
      {
        userId: number;
        bookshelfId: number;
        itemId: number;
        readingStatus: ReadingStatusType;
      }
    >({
      query: ({ userId, bookshelfId, itemId, readingStatus }) => ({
        url: `/users/${userId}/bookshelves/${bookshelfId}/books/${itemId}/status`,
        method: 'PATCH',
        body: { readingStatus },
      }),
      invalidatesTags: ['Bookshelf'],
    }),
    deleteBook: builder.mutation<
      void,
      { userId: number; bookshelfId: number; itemId: number }
    >({
      query: ({ userId, bookshelfId, itemId }) => ({
        url: `/users/${userId}/bookshelves/${bookshelfId}/books/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookshelf'],
    }),
  }),
});

export const {
  useGetBookshelfQuery,
  useUpdateReadingStatusMutation,
  useDeleteBookMutation,
} = bookShelvesApi;
