import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Bookshelf } from '@shared/types/type';

export const libraryApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getLibrary: builder.query<Bookshelf[], string>({
      query: (id) => `library/${id}`,
    }),
  }),
});

export const { useGetLibraryQuery } = libraryApi;
