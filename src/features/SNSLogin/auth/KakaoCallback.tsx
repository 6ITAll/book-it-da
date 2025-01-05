import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetKakaoTokenMutation } from '@features/SNSLogin/api/Kakaoapi';
import { loginSuccess } from '@features/user/userSlice';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KakaoCallback = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getKakaoToken, { data: tokenData, isLoading, error }] =
    useGetKakaoTokenMutation();

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
      console.log('Access Token:', tokenData.access_token);
      dispatch(loginSuccess()); // Redux 상태 업데이트
      navigate('/');
    }
  }, [tokenData, navigate, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return <div>Kakao Login Processing...</div>;
};

export default KakaoCallback;
