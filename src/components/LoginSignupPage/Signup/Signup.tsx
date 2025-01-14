import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import {
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
import PasswordInput from '../PasswordInput';
import { StyledTitle, StyledSubmitButton } from './Signup.styles';
import { SignupData } from '@features/SignupPage/types';
import { schema } from '@utils/SignupPage/yupSchema';

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
  const dispatch = useDispatch();

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

    dispatch(
      showSnackbar({
        message: '회원가입에 성공했습니다!',
        severity: 'success',
      }),
    );
    reset();

    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <StyledTitle variant="h4">회원가입</StyledTitle>
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
        <StyledSubmitButton type="submit" variant="contained" fullWidth>
          회원가입
        </StyledSubmitButton>
      </Box>
    </Container>
  );
};

export default Signup;
