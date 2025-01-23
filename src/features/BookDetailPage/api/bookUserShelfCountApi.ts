import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookUserShelfCountApi = createApi({
  reducerPath: 'bookUserShelfCountApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchLibraryCount: builder.query<
      { isbn: string; libraryCount: number },
      string
    >({
      query: (isbn) => `/books/${isbn}/library-count`,
    }),
  }),
});

export const { useFetchLibraryCountQuery } = bookUserShelfCountApi;
