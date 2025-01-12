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
import PasswordInput from './PasswordInput';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@features/user/userSlice';
import kakaoLoginImg from '@assets/images/kakao_login.png';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

const Login = (): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<{
    content: string;
    isError: boolean;
  }>({
    content: '',
    isError: false,
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement> | null) => {
      if (e) e.preventDefault();
      setLoginMessage({ content: '', isError: false });

      const storedUserInfo = localStorage.getItem('userInfo');

      if (storedUserInfo) {
        const users = JSON.parse(storedUserInfo);
        const user = users.find(
          (user: { userId: string; password: string }) =>
            user.userId === userId && user.password === password,
        );

        if (user) {
          dispatch(loginSuccess());
          if (rememberMe) {
            localStorage.setItem('savedUserId', userId);
          } else {
            localStorage.removeItem('savedUserId');
          }
          if (autoLogin) {
            localStorage.setItem(
              'autoLogin',
              JSON.stringify({ userId, password }),
            );
          } else {
            localStorage.removeItem('autoLogin');
          }
          navigate('/');
        } else {
          setLoginMessage({
            content: '아이디 또는 비밀번호가 올바르지 않습니다.',
            isError: true,
          });
        }
      } else {
        setLoginMessage({
          content: '사용자 정보가 없습니다. 회원가입 후 로그인 해주세요.',
          isError: true,
        });
      }
    },
    [userId, password, rememberMe, autoLogin, navigate, dispatch],
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
    } else {
      setRememberMe(false);
    }

    const autoLoginData = localStorage.getItem('autoLogin');
    if (autoLoginData) {
      const { userId, password } = JSON.parse(autoLoginData);
      setUserId(userId);
      setPassword(password);
      setAutoLogin(true);
      handleLogin(null);
    }
  }, [handleLogin]);

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        로그인
      </Typography>
      <Stack component="form" spacing={2} onSubmit={(e) => handleLogin(e)}>
        <TextField
          label="아이디"
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
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
            }
            label="자동 로그인"
          />
        </Stack>
        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>

        <Divider sx={{ my: 3 }}>또는</Divider>

        <Button
          onClick={handleKakaoLogin}
          sx={{
            padding: 0,
            minWidth: 'auto',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <img
            src={kakaoLoginImg}
            alt="카카오톡 로그인"
            style={{ width: '50%', height: 'auto' }}
          />
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          계정이 없으신가요?{' '}
          <Typography
            component="span"
            sx={{ color: 'primary.main', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            회원가입
          </Typography>
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
