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
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordInput from '../PasswordInput';
import { StyledTitle, StyledSubmitButton, signupStyles } from './Signup.styles';
import { SignupData } from '@features/SignupPage/types';
import { signupSchema } from '@utils/SignupPage/yupSchema';
import { supabase } from '@utils/supabaseClient';
import {
  checkEmailDuplicate,
  checkUserIdDuplicate,
} from '@utils/SignupPage/checkDuplicate';
import BirthDatePicker from './BirthDatePicker';
import { navigateToLoginPage } from '@shared/utils/navigation';

const Signup = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(
    null,
  );

  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const emailValue = watch('email');
  const userIdValue = watch('userId');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData: SignupData) => {
    if (!isEmailAvailable || !isUserIdAvailable) {
      dispatch(
        showSnackbar({
          message: '아이디 또는 이메일 중복 확인을 해주세요.',
          severity: 'error',
        }),
      );
      return;
    }

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
            birth_date: formData.birthDate,
          },
        },
      });

      if (error) {
        if (error.code === 'email_address_invalid') {
          setEmailErrorMessage('유효하지 않은 이메일입니다.');
        } else {
          throw error;
        }
        return;
      }

      dispatch(
        showSnackbar({
          message: '회원가입에 성공했습니다! 이메일을 확인해주세요.',
          severity: 'success',
        }),
      );
      navigateToLoginPage(navigate);
    } catch (error) {
      console.error('Error during signup:', error);
      dispatch(
        showSnackbar({
          message: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
          severity: 'error',
        }),
      );
    }
  };

  const handleEmailDuplicateCheck = async () => {
    try {
      const email = getValues('email');
      const isAvailable = await checkEmailDuplicate(email);
      setIsEmailAvailable(isAvailable);
      if (!isAvailable) {
        dispatch(
          showSnackbar({
            message: '이미 사용 중인 이메일입니다.',
            severity: 'error',
          }),
        );
      } else {
        dispatch(
          showSnackbar({
            message: '사용 가능한 이메일입니다.',
            severity: 'success',
          }),
        );
      }
    } catch (error) {
      console.error('Error checking email duplicate:', error);
      setEmailErrorMessage('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleUserIdDuplicateCheck = async () => {
    try {
      const userId = getValues('userId');
      const isAvailable = await checkUserIdDuplicate(userId);
      setIsUserIdAvailable(isAvailable);
      if (!isAvailable) {
        dispatch(
          showSnackbar({
            message: '이미 사용 중인 아이디입니다.',
            severity: 'error',
          }),
        );
      } else {
        dispatch(
          showSnackbar({
            message: '사용 가능한 아이디입니다.',
            severity: 'success',
          }),
        );
      }
    } catch (error) {
      console.error('Error checking userId duplicate:', error);
    }
  };

  const handleInputChange = (field: 'email' | 'userId') => {
    if (field === 'email') {
      setIsEmailAvailable(null);
      setEmailErrorMessage('');
    } else if (field === 'userId') {
      setIsUserIdAvailable(null);
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
      <StyledTitle variant="h3">회원가입</StyledTitle>
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
        <Box display="flex" alignItems="center" gap={1}>
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
                error={
                  !!errors.email ||
                  isEmailAvailable === false ||
                  !!emailErrorMessage
                }
                helperText={errors.email?.message || emailErrorMessage}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange('email');
                }}
              />
            )}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleEmailDuplicateCheck}
            sx={signupStyles.checkDuplicateButton}
            disabled={!emailValue}
          >
            중복확인
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
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
                error={!!errors.userId}
                helperText={errors.userId?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange('userId');
                }}
              />
            )}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleUserIdDuplicateCheck}
            sx={signupStyles.checkDuplicateButton}
            disabled={!userIdValue}
          >
            중복확인
          </Button>
        </Box>
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
          name="birthDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <BirthDatePicker
              value={field.value}
              onChange={field.onChange}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
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
