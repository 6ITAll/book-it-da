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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { setCheckedPassword } from '@features/user/userSlice';

const PasswordChkPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* TODO API 연결 */
    dispatch(setCheckedPassword(true));
    navigate('/edit-account');
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
          variant="outlined"
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
