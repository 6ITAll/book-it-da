import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetKakaoTokenMutation,
  useGetKakaoUserInfoQuery,
} from '@features/SNSLogin/api/Kakaoapi';
import { loginSuccess } from '@features/user/userSlice';
import { KakaoUserInfo } from '@features/SNSLogin/api/Kakaoapi';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoCallback = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    getKakaoToken,
    { data: tokenData, isLoading: tokenLoading, error: tokenError },
  ] = useGetKakaoTokenMutation();

  const {
    data: kakaoUserInfo,
    isLoading: userLoading,
    error: userError,
  } = useGetKakaoUserInfoQuery(tokenData?.access_token ?? '', {
    skip: !tokenData,
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      getKakaoToken({
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      });
    }
  }, [getKakaoToken]);

  useEffect(() => {
    if (tokenData) {
      localStorage.setItem('kakaoAccessToken', tokenData.access_token);
      console.log('Access Token:', tokenData.access_token);
    }
  }, [tokenData]);

  useEffect(() => {
    if (kakaoUserInfo) {
      dispatch(loginSuccess(kakaoUserInfo as KakaoUserInfo));
      localStorage.setItem('kakaoUserInfo', JSON.stringify(kakaoUserInfo));
      navigate('/');
    }
  }, [kakaoUserInfo, navigate, dispatch]);

  if (tokenLoading || userLoading) return <div>Loading...</div>;

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
      if ('status' in error && 'data' in error) {
        return `Error ${error.status}: ${JSON.stringify(error.data)}`;
      }
    }
    return 'An unexpected error occurred.';
  };

  if (tokenError) return <div>Token Error: {getErrorMessage(tokenError)}</div>;
  if (userError)
    return <div>User Info Error: {getErrorMessage(userError)}</div>;

  return <div>Kakao Login Processing...</div>;
};

export default KakaoCallback;
