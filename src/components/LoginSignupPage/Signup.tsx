import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Typography,
  Button,
  TextField,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordInput from './PasswordInput';

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
  gender: yup.string().required('성별을 선택해주세요'),
  age: yup
    .number()
    .typeError('나이를 입력해주세요')
    .required('나이를 입력해주세요')
    .positive('나이는 양수여야 합니다')
    .integer('나이는 정수여야 합니다'),
});

interface SignupData {
  name: string;
  userId: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
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

    if (users.some((user) => user.userId === data.userId)) {
      setErrorMessage(
        '이 아이디는 이미 사용 중입니다. 다른 아이디를 입력해주세요.',
      );
      return;
    }

    setErrorMessage('');

    const userInfo = {
      name: data.name,
      userId: data.userId,
      phone: data.phone,
      password: data.password,
      gender: data.gender,
      age: data.age,
    };

    users.push(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(users));

    alert('회원가입에 성공했습니다!');
    reset();

    navigate('/login');
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
              helperText={errors.userId?.message || errorMessage}
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
            <PasswordInput
              label="비밀번호"
              value={field.value}
              onChange={field.onChange}
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
            <PasswordInput
              label="비밀번호 확인"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.gender}>
              <InputLabel>성별</InputLabel>
              <Select {...field} label="성별">
                <MenuItem value="male">남성</MenuItem>
                <MenuItem value="female">여성</MenuItem>
              </Select>
              <FormHelperText>{errors.gender?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="age"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              label="나이"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.age}
              helperText={errors.age?.message}
              onChange={(e) =>
                field.onChange(
                  e.target.value === '' ? '' : Number(e.target.value),
                )
              }
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
