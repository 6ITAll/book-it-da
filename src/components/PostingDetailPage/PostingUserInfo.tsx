import {
  useGetPostByIdQuery,
  useToggleFollowMutation,
} from '@features/PostDetailPage/api/postingApi';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import { User } from '@shared/types/type';
import { useParams } from 'react-router-dom';
import { postingDetailStyles } from '@components/PostingDetailPage/PostingDetail.styles';

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
  const { postingId } = useParams();
  const [toggleFollow, { isLoading }] = useToggleFollowMutation();
  const { data: post, refetch } = useGetPostByIdQuery(postingId!);

  const handleFollowToggle = async () => {
    try {
      await toggleFollow({
        userId: user.userId,
        isFollowing: !post?.user.isFollowing,
      });
      refetch(); // 데이터를 강제로 다시 가져옵니다.
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
            color: post?.user.isFollowing ? 'black' : 'primary.main',
            borderColor: post?.user.isFollowing ? 'black' : 'primary.main',
            mb: '0',
          }}
        >
          {post?.user.isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      )}
    </Box>
  );
};

export default PostingUserInfo;
