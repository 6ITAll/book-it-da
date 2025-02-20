import React, { useState, useCallback } from 'react';
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
import { useSetAutoLoginSettings } from '@hooks/useSetAutoLogin';
import { useRememberMe } from '@hooks/useRemeberMe';
import {
  navigateToMainPage,
  navigateToSignUpPage,
} from '@shared/utils/navigation';

const Login = (): JSX.Element => {
  const { rememberMe, savedUserEmail, handleRememberMeChange } =
    useRememberMe();

  const [userEmail, setUserEmail] = useState<string>(savedUserEmail || '');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<LoginMessage>({
    content: '',
    isError: false,
  });
  const autoLogin = useSelector((state: RootState) => state.user.autoLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useSetAutoLoginSettings();
  useKakaoSDK();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setLoginMessage({ content: '', isError: false });
      e.preventDefault();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: password,
        });
        if (error) {
          if (error.message === 'Email not confirmed') {
            dispatch(
              showSnackbar({
                message: '이메일 인증이 필요합니다.',
                severity: 'error',
              }),
            );
          } else {
            throw error;
          }
          return;
        }

        if (data.user && data.session) {
          const { data: userData, error: userError } = await supabase
            .from('user')
            .select('username, avatar_url')
            .eq('id', data.user.id)
            .single();

          if (userError) {
            console.error('Error fetching username:', userError);
            throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
          }
          dispatch(
            loginSuccess({
              id: data.user.id,
              username: userData?.username ?? '',
              avatarUrl: userData?.avatar_url ?? '',
              email: data.user.email ?? '',
              isSocialLogin: false,
            }),
          );
          dispatch(setToken(data.session.access_token));

          if (rememberMe) {
            localStorage.setItem('savedUserEmail', userEmail);
          }

          if (autoLogin) {
            localStorage.setItem('token', data.session.access_token);
          } else {
            localStorage.removeItem('token');
          }

          navigateToMainPage(navigate);
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
    [userEmail, password, dispatch, rememberMe, autoLogin, navigate],
  );

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
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
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
                onChange={(e) =>
                  handleRememberMeChange(userEmail, e.target.checked)
                }
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="h6">계정이 없으신가요? </Typography>
          <SignupButton
            variant="h6"
            onClick={() => navigateToSignUpPage(navigate)}
          >
            회원가입
          </SignupButton>
        </Box>

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
