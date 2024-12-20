import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Typography, Button, TextField, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Yup
const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요'),
  userId: yup
    .string()
    .required('아이디를 입력해주세요')
    .min(4, '아이디는 최소 4자 이상이어야 합니다'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요')
    .matches(/^[0-9]{10,11}$/, '올바른 전화번호 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  confirmPassword: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
});

interface SignupData {
  name: string;
  userId: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Signup = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data: SignupData) => {
    const existingUserInfo = localStorage.getItem('userInfo');
    let users: Array<{ userId: string }> = [];

    if (existingUserInfo) {
      try {
        users = JSON.parse(existingUserInfo);
        if (!Array.isArray(users)) {
          users = [];
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
        users = [];
      }
    }

    // 사용자 ID 중복 체크
    if (users.some((user) => user.userId === data.userId)) {
      setErrorMessage(
        '이 아이디는 이미 사용 중입니다. 다른 아이디를 입력해주세요.',
      );
      return;
    }

    // 오류 메시지 초기화
    setErrorMessage('');

    const userInfo = {
      name: data.name,
      userId: data.userId,
      phone: data.phone,
      password: data.password,
    };

    users.push(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(users));

    alert('회원가입에 성공했습니다!');
    reset(); // 폼 초기화

    navigate('/login-signup');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        회원가입
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="이름"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="아이디"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.userId || !!errorMessage}
              helperText={
                errors.userId?.message || (errorMessage ? errorMessage : '')
              }
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="전화번호"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="비밀번호"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          회원가입
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
