import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import styles from './PostCard.styles';
import { PostType, User } from '@shared/types/type';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';
import { useToggleFollowMutation } from '@features/commons/followApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateFollowStatus } from '@features/FeedPage/slice/feedSlice';
import { RootState } from '@store/index';

interface PostCardHeaderProps {
  user: User;
  createdAt: string;
  postType: PostType;
}

const PostCardHeader = ({
  user,
  createdAt,
  postType,
}: PostCardHeaderProps): JSX.Element => {
  const dispatch = useDispatch();
  const [toggleFollow] = useToggleFollowMutation();
  const isFollowing = useSelector((state: RootState) => {
    const post = state.feed.posts.find(
      (post) => post.user.userId === user.userId,
    );
    return post?.user.isFollowing ?? false;
  });
  const handleFollowClick = async () => {
    try {
      await toggleFollow({
        userId: user.userId,
        isFollowing: !isFollowing,
      }).unwrap();
      dispatch(
        updateFollowStatus({ userId: user.userId, isFollowing: !isFollowing }),
      );
    } catch (error) {
      console.error('팔로우/언팔로우 실패:', error);
    }
  };

  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={<Avatar src={user.avatarUrl} alt={user.userName} />}
      action={
        <Button
          variant="outlined"
          size="small"
          sx={styles.followButton(isFollowing)}
          onClick={handleFollowClick}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      }
      title={
        <Typography variant="body2" fontWeight="bold">
          {user.userName}
        </Typography>
      }
      subheader={
        <Box sx={styles.postInfoBox}>
          <Typography variant="caption" sx={{ fontSize: '11px' }}>
            {postType}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '11px' }}>
            •
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '11px' }}>
            {formatTimeAgo(createdAt)}
          </Typography>
        </Box>
      }
    />
  );
};

export default PostCardHeader;
