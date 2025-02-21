import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { checkUserIdDuplicate } from '@utils/SignupPage/checkDuplicate';
import { supabase } from '@utils/Supabase/supabaseClient';
import { AdditionalInfoData } from './AdditionalInfo.types';
import {
  FormContainer,
  SubmitButton,
  CheckDuplicateButton,
} from './AdditionalInfo.styles';
import { useUpdateUserInfoMutation } from '@features/user/additionalInfoApi';
import { additionalInfoSchema } from '@utils/SignupPage/yupSchema';
import BirthDatePicker from '@components/LoginSignupPage/Signup/BirthDatePicker';
import { RootState } from '@store/index';
import { loginSuccess, UserInfo } from '@features/user/userSlice';
import { navigateToMainPage } from '@shared/utils/navigation';

const AdditionalInfo = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AdditionalInfoData>({
    resolver: yupResolver(additionalInfoSchema),
    mode: 'onChange',
  });

  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(
    null,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    const checkUserStatus = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Session check error:', error);
        navigate('/login');
        return;
      }

      if (!session) {
        dispatch(
          showSnackbar({
            message: '로그인 후 이용해주세요.',
            severity: 'warning',
          }),
        );
        navigate('/login');
      } else if ((userInfo && userInfo.username) || isSubmitted) {
        if (isSubmitted) {
          dispatch(
            showSnackbar({
              message: '추가 정보가 성공적으로 저장되었습니다.',
              severity: 'success',
            }),
          );
        } else {
          dispatch(
            showSnackbar({
              message: '잘못된 접근입니다. 이미 추가 정보를 입력하셨습니다.',
              severity: 'warning',
            }),
          );
        }
        navigate('/');
      }
    };

    checkUserStatus();
  }, [navigate, userInfo, dispatch, isSubmitted]);

  const onSubmit = async (formData: AdditionalInfoData) => {
    if (!isUserIdAvailable) {
      dispatch(
        showSnackbar({
          message: '아이디 중복 확인을 해주세요.',
          severity: 'error',
        }),
      );
      return;
    }

    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError) throw authError;

      const userId = session?.user?.id;
      if (!userId) throw new Error('사용자 ID를 찾을 수 없습니다.');

      await updateUserInfo({ userId, formData }).unwrap();

      dispatch(
        loginSuccess({
          ...(userInfo as UserInfo),
          username: formData.userId,
        }),
      );
      setIsSubmitted(true);
      dispatch(
        showSnackbar({
          message: '추가 정보가 성공적으로 저장되었습니다.',
          severity: 'success',
        }),
      );
      navigateToMainPage(navigate);
    } catch (error) {
      console.error('추가 정보 저장 실패:', error);
      dispatch(
        showSnackbar({
          message: '추가 정보를 저장하는 중 오류가 발생했습니다.',
          severity: 'error',
        }),
      );
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
      console.error('ID 중복 확인 중 오류 발생:', error);
      dispatch(
        showSnackbar({
          message: '중복 확인 중 오류가 발생했습니다.',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ p: 2, mt: '2rem', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        추가 정보 입력
      </Typography>
      <Box>
        <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            render={({ field }): JSX.Element => (
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  {...field}
                  label="아이디"
                  variant="outlined"
                  fullWidth
                  error={!!errors.userId}
                  helperText={errors.userId?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    setIsUserIdAvailable(null); // 중복 확인 초기화
                  }}
                />
                <CheckDuplicateButton
                  variant="contained"
                  onClick={handleUserIdDuplicateCheck}
                  disabled={!field.value} // 값이 없으면 비활성화
                >
                  중복확인
                </CheckDuplicateButton>
              </Box>
            )}
          />
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }): JSX.Element => (
              <FormControl fullWidth error={!!errors.gender}>
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
            render={({ field }): JSX.Element => (
              <BirthDatePicker
                value={field.value}
                onChange={field.onChange}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
              />
            )}
          />
          <SubmitButton type="submit" variant="contained" fullWidth>
            정보 제출
          </SubmitButton>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default AdditionalInfo;
