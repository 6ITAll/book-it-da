import { Bookshelf } from '@features/BookDetailPage/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddBookPayload } from '@features/BookDetailPage/types/types';

export const addToLibraryApi = createApi({
  reducerPath: 'addToLibraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // 책장 목록 조회
    getBookshelves: builder.query<Bookshelf[], string>({
      query: (userId) => `/users/${userId}/add-to-library/bookshelves`,
    }),
    // 책장 추가
    addBookshelf: builder.mutation<
      { message: string; bookshelf: Bookshelf },
      { userId: string; name: string }
    >({
      query: ({ userId, name }) => ({
        url: `/users/${userId}/bookshelves/add-to-library`,
        method: 'POST',
        body: { name }, // 요청 필드
      }),
    }),
    // 책 추가
    addBookToBookshelf: builder.mutation<
      void,
      {
        itemId: number;
        userId: string;
        id: number;
        book: AddBookPayload;
      }
    >({
      query: ({ userId, id, book }) => ({
        url: `/users/${userId}/bookshelves/add-to-library/${id}/books`,
        method: 'POST',
        body: book,
      }),
    }),
  }),
});

export const {
  useGetBookshelvesQuery,
  useAddBookToBookshelfMutation,
  useAddBookshelfMutation,
} = addToLibraryApi;
