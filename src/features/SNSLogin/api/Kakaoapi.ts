import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IKakaoTokenData {
  client_id: string;
  redirect_uri: string;
  code: string;
}

export interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export const kakaoApi = createApi({
  reducerPath: 'kakaoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kauth.kakao.com' }),
  endpoints: (builder) => ({
    getKakaoToken: builder.mutation<KakaoTokenResponse, IKakaoTokenData>({
      query: (data) => ({
        url: '/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: data.client_id,
          redirect_uri: data.redirect_uri,
          code: data.code,
        }),
      }),
    }),
  }),
});

export const { useGetKakaoTokenMutation } = kakaoApi;
