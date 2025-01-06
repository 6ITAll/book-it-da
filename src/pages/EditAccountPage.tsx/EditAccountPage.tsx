import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  IconButton,
  styled,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { User } from '@features/user/types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type ACCOUNT = Omit<User, 'gender' | 'age'>;

const EditAccountPage = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<ACCOUNT>({
    name: '김구름',
    userId: 'publ***',
    phone: '010****4561',
    password: '',
    avatarUrl: '',
  });

  const checkedPassword = useSelector(
    (state: RootState) => state.user.checkedPassword,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkedPassword) navigate('/edit-account/passwordChk');
  }, [checkedPassword, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (field: string) => {
    console.log(field);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Stack alignItems="center" spacing={1} mb={4}>
        <Avatar
          src={userInfo.avatarUrl}
          alt="avatar"
          sx={{
            width: 96,
            height: 96,
          }}
        />
        <Stack direction="row" spacing={1}>
          <IconButton component="label">
            <CameraAltIcon />
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
            />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Stack>
        <Typography variant="h6" fontWeight="bold" mb={4}>
          개인정보 수정
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="이름"
            name="nickname"
            value={userInfo.name}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100px', height: '50px' }}
            onClick={() => handleSubmit('이름')}
          >
            변경하기
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="휴대폰 번호"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100px', height: '50px' }}
            onClick={() => handleSubmit('휴대폰 번호')}
          >
            변경하기
          </Button>
        </Stack>

        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          계정 정보
        </Typography>

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          label="아이디"
          name="userId"
          value={userInfo.userId}
          disabled
        />

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100px', height: '50px' }}
            onClick={() => handleSubmit('비밀번호')}
          >
            변경하기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default EditAccountPage;
