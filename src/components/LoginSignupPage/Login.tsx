import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Link,
  Button,
  TextField,
  Container,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@store/userSlice/userSlice';

interface LoginProps {
  onLogin: (userId: string) => void;
}

interface LoginMessage {
  content: string;
  isError: boolean; //에러메시지 속성
}

const Login = ({ onLogin }: LoginProps): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<LoginMessage>({
    content: '',
    isError: false,
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | null,
      userIdParam?: string,
      passwordParam?: string,
    ) => {
      if (e) e.preventDefault();
      setLoginMessage({ content: '', isError: false });

      const loginUserId = userIdParam || userId;
      const loginPassword = passwordParam || password;

      const storedUserInfo = localStorage.getItem('userInfo');

      if (storedUserInfo) {
        const users = JSON.parse(storedUserInfo);
        const user = users.find(
          (user: { userId: string; password: string }) =>
            user.userId === loginUserId && user.password === loginPassword,
        );

        if (user) {
          onLogin(loginUserId);
          dispatch(loginSuccess());
          if (rememberMe) {
            localStorage.setItem('savedUserId', loginUserId);
          } else {
            localStorage.removeItem('savedUserId');
          }
          if (autoLogin) {
            localStorage.setItem(
              'autoLogin',
              JSON.stringify({ userId: loginUserId, password: loginPassword }),
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
    [userId, password, rememberMe, autoLogin, onLogin, navigate, dispatch],
  );

  useEffect(() => {
    const savedUserId = localStorage.getItem('savedUserId');
    if (savedUserId) {
      setUserId(savedUserId);
      setRememberMe(true);
    }

    const autoLoginData = localStorage.getItem('autoLogin');
    if (autoLoginData) {
      const { userId, password } = JSON.parse(autoLoginData);
      setUserId(userId);
      setPassword(password);
      setAutoLogin(true);
      handleLogin(null, userId, password); // 자동 로그인 시도
    }
  }, [handleLogin]);

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
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={2}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
      </Stack>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Link href="/find-username" variant="body2">
          아이디 찾기
        </Link>
        <Link href="/find-password" variant="body2">
          비밀번호 찾기
        </Link>
        <Link href="/signup" variant="body2">
          회원가입
        </Link>
      </Stack>
      {loginMessage.content && (
        <Typography
          color={loginMessage.isError ? 'error' : 'primary'}
          sx={{ mt: 2 }}
        >
          {loginMessage.content}
        </Typography>
      )}
    </Container>
  );
};

export default Login;
