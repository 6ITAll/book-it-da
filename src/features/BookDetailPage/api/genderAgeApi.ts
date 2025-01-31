import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenderAge } from '@shared/types/type';

export const genderAgeApi = createApi({
  reducerPath: 'genderAgeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getGenderAge: builder.query<GenderAge[], string>({
      query: (isbn) => `gender-age/${isbn}`,
    }),
  }),
});
export const { useGetGenderAgeQuery } = genderAgeApi;
