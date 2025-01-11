import {
  Bookshelf,
  AddBookPayload,
} from '@features/BookDetailPage/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addToLibraryApi = createApi({
  reducerPath: 'addToLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // 책장 목록 조회
    getBookshelves: builder.query<Bookshelf[], string>({
      query: (userId) => `/users/${userId}/add-to-library/bookshelves`,
    }),
    // 책 추가
    addBookToBookshelf: builder.mutation<
      void,
      {
        itemId: number;
        userId: string;
        bookshelfId: number;
        book: AddBookPayload;
      }
    >({
      query: ({ userId, bookshelfId, book }) => ({
        url: `/users/${userId}/bookshelves/add-to-library/${bookshelfId}/books`,
        method: 'POST',
        body: book,
      }),
    }),
    // 책장 추가
    addBookshelf: builder.mutation<
      { message: string; bookshelf: Bookshelf },
      { userId: string; bookshelfName: string }
    >({
      query: ({ userId, bookshelfName }) => ({
        url: `/users/${userId}/bookshelves/add-to-library`,
        method: 'POST',
        body: { bookshelfName },
      }),
    }),
  }),
});

export const {
  useGetBookshelvesQuery,
  useAddBookToBookshelfMutation,
  useAddBookshelfMutation,
} = addToLibraryApi;
