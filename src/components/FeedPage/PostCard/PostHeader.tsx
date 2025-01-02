import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { FeedType, PostType } from '@shared/types/type';

interface PostCardHeaderProps {
  userName: string;
  postType: PostType;
  timeAgo: string;
  feedType: FeedType;
}

const PostCardHeader = ({
  userName,
  postType,
  timeAgo,
  feedType,
}: PostCardHeaderProps) => {
  const isFollowing = feedType === '팔로잉';

  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={<Avatar />}
      action={
        <Button
          variant="outlined"
          size="small"
          sx={styles.followButton(isFollowing)}
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
