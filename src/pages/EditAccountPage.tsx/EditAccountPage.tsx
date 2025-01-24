import {
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  useDeleteAvatarFileMutation,
  useGetUserByIdQuery,
  useUpdateAvatarMutation,
  useUpdateFieldMutation,
} from '@features/user/userApi';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { setAvatarUrl } from '@features/user/userSlice';

const EditAccountPage = (): JSX.Element => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userId = userInfo?.id;
  const dispatch = useDispatch();

  const { data, refetch } = useGetUserByIdQuery(userId || '', {
    skip: !userId,
  });

  const [updateField] = useUpdateFieldMutation();
  const [updateAvatar] = useUpdateAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarFileMutation();

  // 단일 필드 업데이트 핸들러
  const handleSubmit = async (fieldName: keyof typeof data) => {
    const stringFieldName = String(fieldName);
    try {
      if (!data || !userId) return;

      const newValue = (
        document.querySelector(
          `[name="${stringFieldName}"]`,
        ) as HTMLInputElement
      )?.value;

      const result = await updateField({
        userId,
        fieldName,
        value: newValue,
      }).unwrap();

      if (result) {
        dispatch(
          showSnackbar({
            message: `${stringFieldName}이(가) 성공적으로 업데이트되었습니다.`,
            severity: 'success',
          }),
        );
        refetch();
      }
    } catch (err) {
      console.error(`${stringFieldName} 업데이트 중 오류가 발생했습니다.`, err);
      dispatch(
        showSnackbar({
          message: `${stringFieldName} 업데이트 중 오류가 발생했습니다.`,
          severity: 'error',
        }),
      );
    }
  };

  // 아바타 업로드 핸들러
  const handleAvatarUpload = async (file: File) => {
    try {
      if (!userId) return;

      const updatedAvatarUrl = await updateAvatar({ userId, file }).unwrap();

      if (updatedAvatarUrl) {
        dispatch(setAvatarUrl(updatedAvatarUrl));

        dispatch(
          showSnackbar({
            message: `프로필 사진이 업데이트 되었습니다.`,
            severity: 'success',
          }),
        );
        refetch();
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          message: `프로필 사진 업데이트 중 오류가 발생했습니다.`,
          severity: 'error',
        }),
      );
      console.error('프로필 사진 업로드 실패:', err);
    }
  };

  // 아바타 삭제 핸들러
  const handleAvatarDelete = async () => {
    try {
      if (!data?.avatar_url || !userId) return;

      await deleteAvatar({ userId, avatarUrl: data.avatar_url }).unwrap();
      dispatch(setAvatarUrl(''));
      dispatch(
        showSnackbar({
          message: `프로필 사진이 삭제되었습니다.`,
          severity: 'success',
        }),
      );
      refetch();
    } catch (err) {
      dispatch(
        showSnackbar({
          message: `프로필 사진 삭제 중 오류가 발생했습니다.`,
          severity: 'error',
        }),
      );
      console.error('아바타 삭제 실패:', err);
    }
  };

  if (!data) return <Typography>로딩 중...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {/* 아바타 섹션 */}
      <Stack alignItems="center" spacing={1} mb={3}>
        <Avatar
          src={data.avatar_url}
          alt="avatar"
          sx={{ width: 96, height: 96 }}
        />
        <Stack direction="row" spacing={1}>
          <IconButton component="label">
            <CameraAltIcon />
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => {
                if (event.target.files)
                  handleAvatarUpload(event.target.files[0]);
              }}
            />
          </IconButton>
          <IconButton onClick={handleAvatarDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* 개인정보 수정 섹션 */}
      <Stack>
        <Typography variant="h6" fontWeight="bold" mb={4}>
          개인정보 수정
        </Typography>

        {/* 닉네임 */}
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="닉네임"
            name="username"
            defaultValue={data.username || ''}
            // onBlur={() => handleSubmit('username')}
          />
          <Button variant="contained" onClick={() => handleSubmit('username')}>
            변경하기
          </Button>
        </Stack>

        {/* 이름 */}
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="이름"
            name="name"
            defaultValue={data.name || ''}
            // onBlur={() => handleSubmit('name')}
          />
          <Button variant="contained" onClick={() => handleSubmit('name')}>
            변경하기
          </Button>
        </Stack>

        {/* 전화번호 */}
        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <TextField
            fullWidth
            label="휴대폰 번호"
            name="phone"
            defaultValue={data.phone || ''}
            // onBlur={() => handleSubmit('phone')}
          />
          <Button variant="contained" onClick={() => handleSubmit('phone')}>
            변경하기
          </Button>
        </Stack>

        {/* 이메일 (읽기 전용) */}
        <TextField
          fullWidth
          label="이메일"
          name="email"
          defaultValue={data.email || ''}
          disabled
        />

        {/* 나이 */}
        <Stack direction="row" alignItems="center" spacing={1} mt={3}>
          <TextField
            fullWidth
            label="나이"
            name="age"
            type="number"
            defaultValue={data.age ?? ''}
            // onBlur={() => handleSubmit('age')}
          />
          <Button variant="contained" onClick={() => handleSubmit('age')}>
            변경하기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default EditAccountPage;
