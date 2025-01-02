import { useEffect } from 'react';
import {
  useGetKakaoTokenMutation,
  IKakaoTokenData,
} from '@features/SNSLogin/api/Kakaoapi';

export const useKakaoAuth = (data: IKakaoTokenData) => {
  const [getKakaoToken, { data: tokenData, isLoading, error }] =
    useGetKakaoTokenMutation();

  useEffect(() => {
    if (data.code) {
      getKakaoToken(data);
    }
  }, [data, getKakaoToken]);

  return { accessToken: tokenData?.access_token, isLoading, error };
};
