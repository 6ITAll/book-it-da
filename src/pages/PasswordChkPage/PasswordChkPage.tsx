import {
  Avatar,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { supabase } from '@utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { setCheckedPassword } from '@features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { navigateToProfileEditPage } from '@shared/utils/navigation';

const PasswordChkPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordCheck = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        dispatch(
          showSnackbar({
            message: '사용자 정보를 가져올 수 없습니다.',
            severity: 'error',
          }),
        );
        return;
      }

      const email = session.user.email;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        dispatch(
          showSnackbar({
            message: '비밀번호가 올바르지 않습니다.',
            severity: 'error',
          }),
        );
        return;
      }

      dispatch(setCheckedPassword(true));
      navigateToProfileEditPage(navigate);
    } catch (err) {
      console.error('비밀번호 확인 중 오류 발생:', err);
      dispatch(
        showSnackbar({
          message: '오류가 발생했습니다. 다시 시도해주세요.',
          severity: 'error',
        }),
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePasswordCheck();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePasswordCheck();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Stack textAlign="center" mb={4}>
        <Avatar
          sx={{
            width: 96,
            height: 96,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 48, color: 'white' }} />
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          비밀번호 확인
        </Typography>
        <Typography variant="body2" color="text.secondary">
          안전한 개인정보 변경을 위해 비밀번호를 다시 입력해주세요.
        </Typography>
      </Stack>
      <Stack component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="password"
          label="비밀번호 입력"
          name="password"
          value={password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          확인
        </Button>
      </Stack>
    </Container>
  );
};

export default PasswordChkPage;
