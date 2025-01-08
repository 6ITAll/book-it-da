import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { User } from '@shared/types/type';

interface PostingUserInfoProps {
  user: User;
  createdAt: string;
  currentUserId: number;
}

const styles = {
  userInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 1,
    mb: 3,
    width: '100%',
    borderBottom: '1px solid #eee',
  },
};

const PostingUserInfo = ({
  user,
  createdAt,
  currentUserId,
}: PostingUserInfoProps) => {
  return (
    <Box sx={styles.userInfoBox}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user.avatarUrl} />
        <Stack>
          <Typography>{user.userName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toISOString().split('T')[0]}
          </Typography>
        </Stack>
      </Stack>
      {user.userId !== currentUserId && (
        // 팔로우 버튼 공통 컴포넌트로 만들 예정
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: user.isFollowing ? 'black' : 'primary.main',
            borderColor: user.isFollowing ? 'black' : 'primary.main',
            mb: '0',
          }}
        >
          {user.isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
