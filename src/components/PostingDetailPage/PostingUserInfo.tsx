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
  isUserOwnsPost: boolean;
}

const PostingUserInfo = ({
  user,
  createdAt,
  isUserOwnsPost,
}: PostingUserInfoProps) => {
  const dispatch = useDispatch();
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();
  const currentPost = useSelector(
    (state: RootState) => state.postingDetail.currentPost,
  );
  console.log(user);
  console.log(isUserOwnsPost);

  // const handleFollowToggle = async () => {
  //   try {
  //     const result = await toggleFollow({
  //       userId: user.userId,
  //       isFollowing: !isFollowing,
  //     }).unwrap();
  //     if (result.success) {
  //       dispatch(updateFollowStatus(!isFollowing));
  //     }
  //   } catch (error) {
  //     console.error('팔로우 토글 실패:', error);
  //   }
  // };

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
      {!isUserOwnsPost && (
        <Button
          variant="outlined"
          size="small"
          // onClick={handleFollowToggle}
          disabled={isLoading}
          sx={postingDetailStyles.userInfoBoxButton(user.isFollowing ?? false)}
        >
          {user.isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
