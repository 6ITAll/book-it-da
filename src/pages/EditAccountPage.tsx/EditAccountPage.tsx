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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { Account } from '@features/user/types';
import {
  useDeleteAvatarMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUploadAvatarMutation,
} from '@features/user/userApi';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

const EditAccountPage = (): JSX.Element => {
  const mockUserId = 'user';

  const [userInfoState, setUserInfoState] = useState<Account>({
    userId: '',
    password: '',
    name: '',
    phone: '',
    avatarUrl: '',
  });

  const checkedPassword = useSelector(
    (state: RootState) => state.user.checkedPassword,
  );

  const navigate = useNavigate();

  const { data: userInfo } = useGetUserInfoQuery(mockUserId);
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!checkedPassword) navigate('/edit-account/passwordChk');
  }, [checkedPassword, navigate]);

  useEffect(() => {
    if (userInfo) {
      setUserInfoState({ ...userInfo, password: '' });
    }
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfoState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (field: string) => {
    try {
      const response = await updateUserInfo({
        userId: mockUserId,
        field,
        value: userInfoState[field as keyof typeof userInfoState],
      }).unwrap();
      dispatch(
        showSnackbar({ message: response.message, severity: 'success' }),
      );
      if (field === '비밀번호') {
        setUserInfoState((prev) => ({ ...prev, password: '' }));
      }
    } catch (err) {
      const error = err as FetchBaseQueryError;

      dispatch(
        showSnackbar({
          message: (error.data as { message: string }).message,
          severity: 'error',
        }),
      );
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const response = await uploadAvatar({
        userId: mockUserId,
        file,
      }).unwrap();

      setUserInfoState((prev) => ({ ...prev, avatarUrl: response.avatarUrl }));
      dispatch(
        showSnackbar({
          message: response.message,
          severity: 'success',
        }),
      );
    } catch (err) {
      const error = err as FetchBaseQueryError;
      dispatch(
        showSnackbar({
          message: (error.data as { message: string }).message,
          severity: 'error',
        }),
      );
    }
  };

  const handleAvatarDelete = async () => {
    try {
      const response = await deleteAvatar(mockUserId).unwrap();
      setUserInfoState((prev) => ({ ...prev, avatarUrl: '' }));
      dispatch(
        showSnackbar({
          message: response.message,
          severity: 'success',
        }),
      );
    } catch (err) {
      const error = err as FetchBaseQueryError;
      dispatch(
        showSnackbar({
          message: (error.data as { message: string }).message,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Stack alignItems="center" spacing={1} mb={3}>
        <Avatar
          src={userInfoState.avatarUrl}
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
              onChange={(event) => {
                if (event.target.files) {
                  handleAvatarUpload(event.target.files[0]);
                }
              }}
            />
          </IconButton>
          <IconButton onClick={handleAvatarDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Stack>
        <Stack alignItems="center">
          <Typography variant="h6" fontWeight="bold" mb={4}>
            개인정보 수정
          </Typography>
        </Stack>

        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          회원 정보
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="이름"
            name="name"
            value={userInfoState.name}
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
            value={userInfoState.phone}
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
          value={userInfoState.userId}
          disabled
        />

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            type="password"
            label="비밀번호"
            name="password"
            value={userInfoState.password}
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
