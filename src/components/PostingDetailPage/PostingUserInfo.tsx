import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { User } from '@shared/types/type';
import { postingDetailStyles } from './PostingDetail.styles';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface PostingUserInfoProps {
  user: User;
  createdAt: string;
  isUserOwnsPost: boolean;
}

const PostingUserInfo = ({
  user,
  createdAt,
  isUserOwnsPost,
}: PostingUserInfoProps) => {
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  console.log(user);
  console.log(isUserOwnsPost);

  const { data: followStatus, refetch } = useCheckFollowStatusQuery(user.id, {
    skip: !isLoggedIn || isUserOwnsPost,
  });

  const handleFollowClick = async () => {
    if (!isLoggedIn || isUserOwnsPost) return;
    try {
      await toggleFollow(user.id);
      refetch();
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  return (
    <Box sx={postingDetailStyles.userInfoBox}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user.avatarUrl} />
        <Stack>
          <Typography>{user.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toISOString().split('T')[0]}
          </Typography>
        </Stack>
      </Stack>
      {isLoggedIn && !isUserOwnsPost && (
        <Button
          variant="outlined"
          size="small"
          onClick={handleFollowClick}
          disabled={isLoading}
          sx={postingDetailStyles.userInfoBoxButton(followStatus?.isFollowing)}
        >
          {followStatus?.isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
