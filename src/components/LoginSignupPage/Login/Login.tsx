import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Button,
  TextField,
  Container,
  Stack,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setAutoLogin, setToken } from '@features/user/userSlice';
import { LoginMessage } from './types';
import { StyledButton, StyledTypography } from './Login.styles';
// import { KakaoUserInfo } from '@features/SNSLogin/api/Kakaoapi';
import kakaoLoginImg from '@assets/images/kakao_login.png';
import { supabase } from '@utils/supabaseClient';
import { RootState } from '@store/index';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

const Login = (): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<LoginMessage>({
    content: '',
    isError: false,
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const autoLogin = useSelector((state: RootState) => state.user.autoLogin);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userId,
          password: password,
        });
        if (error) throw error;

        if (data.user && data.session) {
          dispatch(
            loginSuccess({
              id: data.user.id,
              email: data.user.email ?? '',
            }),
          );
          dispatch(setToken(data.session.access_token));

          if (autoLogin) {
            localStorage.setItem('token', data.session.access_token);
          } else {
            localStorage.removeItem('token');
          }

          navigate('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginMessage({
          content:
            error instanceof Error
              ? error.message
              : '로그인 중 오류가 발생했습니다.',
          isError: true,
        });
      }
    },
    [userId, password, autoLogin, dispatch, navigate],
  );

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('userInfo:', userInfo);
  }, [isLoggedIn, userInfo]);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    if (isChecked) {
      localStorage.setItem('savedUserId', userId);
    } else {
      localStorage.removeItem('savedUserId');
    }
  };

  useEffect(() => {
    const savedUserId = localStorage.getItem('savedUserId');
    if (savedUserId) {
      setUserId(savedUserId);
      setRememberMe(true);
    }

    const checkAutoLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data: settings } = await supabase
          .from('user_settings')
          .select('auto_login')
          .eq('user_id', session.user.id)
          .single();

        if (settings && settings.auto_login) {
          dispatch(
            loginSuccess({
              id: session.user.id,
              email: session.user.email ?? '',
            }),
          );
          navigate('/');
        }
      }
    };

    checkAutoLogin();
  }, [dispatch, navigate]);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        로그인
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleLogin}>
        <TextField
          label="이메일"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <PasswordInput
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            }
            label="아이디 저장"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={autoLogin}
                onChange={(e) => dispatch(setAutoLogin(e.target.checked))}
              />
            }
            label="자동 로그인"
          />
        </Stack>
        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>

        <Divider sx={{ my: 3 }}>또는</Divider>

        <StyledButton onClick={handleKakaoLogin}>
          <img
            src={kakaoLoginImg}
            alt="카카오톡 로그인"
            style={{ width: '50%', height: 'auto' }}
          />
        </StyledButton>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          계정이 없으신가요?{' '}
          <StyledTypography
            component="span"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </StyledTypography>
        </Typography>

        {loginMessage.content && (
          <Typography
            color={loginMessage.isError ? 'error' : 'primary'}
            sx={{ mt: 2 }}
          >
            {loginMessage.content}
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
