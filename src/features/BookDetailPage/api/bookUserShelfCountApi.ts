import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookUserShelfCountApi = createApi({
  reducerPath: 'bookUserShelfCountApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchLibraryCount: builder.query<
      { itemId: number; libraryCount: number },
      number
    >({
      query: (itemId) => `/books/${itemId}/library-count`,
    }),
  }),
});

export const { useFetchLibraryCountQuery } = bookUserShelfCountApi;
