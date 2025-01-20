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
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setAutoLogin, setToken } from '@features/user/userSlice';
import { LoginMessage } from './types';
import { loginStyles, StyledKakaoButton, SignupButton } from './Login.styles';
import kakaoLogo from '@assets/images/kakao-logo.svg';
import { supabase } from '@utils/supabaseClient';
import { RootState } from '@store/index';
import { useKakaoSDK } from '@hooks/useKakaoSDK';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';

const Login = (): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<LoginMessage>({
    content: '',
    isError: false,
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const autoLogin = useSelector((state: RootState) => state.user.autoLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setLoginMessage({ content: '', isError: false });
      e.preventDefault();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userId,
          password: password,
        });
        if (error) {
          if (error.message === 'Email not confirmed') {
            dispatch(
              showSnackbar({
                message: '이메일을 확인해주세요.',
                severity: 'error',
              }),
            );
          } else {
            throw error;
          }
          return;
        }

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

  useKakaoSDK();

  const handleKakaoLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/oauth/kakao`,
          queryParams: {
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Kakao login error:', error);
      setLoginMessage({
        content: '카카오 로그인 중 오류가 발생했습니다.',
        isError: true,
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 2,
        mt: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h3"
        sx={{ alignSelf: 'center', fontWeight: 'bold', mb: 4 }}
      >
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
            label={<Typography variant="h6">아이디 저장</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={autoLogin}
                onChange={(e) => dispatch(setAutoLogin(e.target.checked))}
              />
            }
            label={<Typography variant="h6">자동 로그인</Typography>}
          />
        </Stack>
        <Button type="submit" variant="contained" sx={loginStyles.loginButton}>
          로그인
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="h6">또는</Typography>
        </Divider>

        <Box sx={loginStyles.snsLoginBox}>
          <StyledKakaoButton onClick={handleKakaoLogin}>
            <img
              src={kakaoLogo}
              alt="Kakao Logo"
              style={{
                width: '35px',
                height: '35px',
                objectFit: 'contain',
              }}
            />
          </StyledKakaoButton>
        </Box>

        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          계정이 없으신가요?{' '}
          <SignupButton variant="h6" onClick={() => navigate('/signup')}>
            회원가입
          </SignupButton>
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
