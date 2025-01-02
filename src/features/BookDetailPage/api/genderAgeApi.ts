import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenderAge } from '@shared/types/type';

export const genderAgeApi = createApi({
  reducerPath: 'genderAgeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGenderAge: builder.query<GenderAge[], number>({
      query: (itemId) => `gender-age/${itemId}`, // itemId를 경로에 반영
    }),
  }),
});
export const { useGetGenderAgeQuery } = genderAgeApi;
