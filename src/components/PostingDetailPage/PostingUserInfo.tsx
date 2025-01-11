import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { User } from '@shared/types/type';
import { postingDetailStyles } from './PostingDetail.styles';
import { useToggleFollowMutation } from '@features/commons/followApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { updateFollowStatus } from '@features/PostDetailPage/slice/postingDetailSlice';

interface PostingUserInfoProps {
  user: User;
  createdAt: string;
  currentUserId: number;
}

const PostingUserInfo = ({
  user,
  createdAt,
  currentUserId,
}: PostingUserInfoProps) => {
  const dispatch = useDispatch();
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();
  const currentPost = useSelector(
    (state: RootState) => state.postingDetail.currentPost,
  );
  const isFollowing = currentPost?.user.isFollowing ?? false;

  const handleFollowToggle = async () => {
    try {
      const result = await toggleFollow({
        userId: user.userId,
        isFollowing: !isFollowing,
      }).unwrap();
      if (result.success) {
        dispatch(updateFollowStatus(!isFollowing));
      }
    } catch (error) {
      console.error('팔로우 토글 실패:', error);
    }
  };

  return (
    <Box sx={postingDetailStyles.userInfoBox}>
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
        <Button
          variant="outlined"
          size="small"
          onClick={handleFollowToggle}
          disabled={isLoading}
          sx={{
            color: isFollowing ? 'black' : 'primary.main',
            borderColor: isFollowing ? 'black' : 'primary.main',
            mb: '0',
          }}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
