import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetBookshelfParams, GetBookshelfResponse } from '../types/types';

export const bookShelvesApi = createApi({
  reducerPath: 'bookshelvesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getBookshelf: builder.query<GetBookshelfResponse, GetBookshelfParams>({
      query: ({ userId, bookshelfId }) =>
        `/users/${userId}/bookshelves/${bookshelfId}`,
    }),
  }),
});

export const { useGetBookshelfQuery } = bookShelvesApi;
