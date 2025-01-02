import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { PostType } from '@shared/types/type';
import { useToggleFollowMutation } from '@features/FeedPage/api/feedApi';

interface PostCardHeaderProps {
  userName: string;
  postType: PostType;
  timeAgo: string;
  isFollowing: boolean;
}

const PostCardHeader = ({
  userName,
  postType,
  timeAgo,
  isFollowing,
}: PostCardHeaderProps) => {
  const [toggleFollow] = useToggleFollowMutation();

  const handleFollowClick = async () => {
    try {
      await toggleFollow({
        userName,
        isFollowing: !isFollowing,
      }).unwrap();
    } catch (error) {
      console.error('팔로우 / 언팔로우 실패:', error);
    }
  };
  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={<Avatar />}
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
          {userName}
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
            {timeAgo}
          </Typography>
        </Box>
      }
    />
  );
};

export default PostCardHeader;
