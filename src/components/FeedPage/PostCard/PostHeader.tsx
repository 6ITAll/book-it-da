import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { PostType } from '@shared/types/type';
import { useEffect, useState } from 'react';

interface PostCardHeaderProps {
  userName: string;
  postType: PostType;
  timeAgo: string;
  isFollowing: boolean;
  onFollowChange: (userName: string, isFollowing: boolean) => void;
}

const PostCardHeader = ({
  userName,
  postType,
  timeAgo,
  isFollowing,
  onFollowChange,
}: PostCardHeaderProps) => {
  const [localFollowState, setLocalFollowState] = useState(isFollowing);

  const handleFollowClick = () => {
    const newState = !localFollowState;
    setLocalFollowState(newState);
    onFollowChange(userName, newState);
  };

  useEffect(() => {
    setLocalFollowState(isFollowing);
  }, [isFollowing]);
  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={<Avatar />}
      action={
        <Button
          variant="outlined"
          size="small"
          sx={styles.followButton(localFollowState)}
          onClick={handleFollowClick}
        >
          {localFollowState ? '팔로잉' : '팔로우'}
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
