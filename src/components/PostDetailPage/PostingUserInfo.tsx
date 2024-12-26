import { Box, Typography, Avatar, Button, Stack } from '@mui/material';

interface PostingUserInfoProps {
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  currentUserId: number;
}

const PostingUserInfo = ({
  user,
  createdAt,
  currentUserId,
}: PostingUserInfoProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        mb: 3,
        width: '100%',
        borderBottom: '1px solid #eee',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user.avatarUrl} />
        <Stack>
          <Typography>{user.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toISOString().split('T')[0]}
          </Typography>
        </Stack>
      </Stack>
      {user.id !== currentUserId && (
        <Button variant="outlined" size="small">
          팔로우
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
