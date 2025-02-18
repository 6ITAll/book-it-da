import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApiSettings = {
  // keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // refetchOnMountOrArgChange: true,
};

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
});
