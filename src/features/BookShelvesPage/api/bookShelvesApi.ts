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
      { userId: string; bookshelfId: number }
    >({
      query: ({ userId, bookshelfId }) =>
        `/users/${userId}/bookshelves/${bookshelfId}`,
      providesTags: ['Bookshelf'],
    }),
    updateReadingStatus: builder.mutation<
      void,
      {
        userId: string;
        bookshelfId: number;
        isbn: string;
        readingStatus: ReadingStatusType;
      }
    >({
      query: ({ userId, bookshelfId, isbn, readingStatus }) => ({
        url: `/users/${userId}/bookshelves/${bookshelfId}/books/${isbn}/status`,
        method: 'PATCH',
        body: { readingStatus },
      }),
      invalidatesTags: ['Bookshelf'],
    }),
    deleteBook: builder.mutation<
      void,
      { userId: string; bookshelfId: number; isbn: string }
    >({
      query: ({ userId, bookshelfId, isbn }) => ({
        url: `/users/${userId}/bookshelves/${bookshelfId}/books/${isbn}`,
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
