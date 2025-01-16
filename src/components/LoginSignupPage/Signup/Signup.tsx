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
import { supabase } from '@utils/supabaseClient';

const Signup = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData: SignupData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.userId,
            name: formData.name,
            phone: formData.phone,
            gender: formData.gender,
            age: formData.age,
          },
        },
      });

      if (error) throw error;

      dispatch(
        showSnackbar({
          message: '회원가입에 성공했습니다! 이메일을 확인해주세요.',
          severity: 'success',
        }),
      );
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container maxWidth="sm">
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
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="이메일"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
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
