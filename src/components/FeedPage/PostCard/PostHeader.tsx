import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { PostType, User } from '@shared/types/type';
import { useEffect, useState } from 'react';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';

interface PostCardHeaderProps {
  user: User;
  createdAt: string;
  postType: PostType;
  onFollowChange: (userId: number, isFollowing: boolean) => void;
}

const PostCardHeader = ({
  user,
  createdAt,
  postType,
  onFollowChange,
}: PostCardHeaderProps) => {
  const [localFollowState, setLocalFollowState] = useState(user.isFollowing);

  const handleFollowClick = () => {
    const newState = !localFollowState;
    setLocalFollowState(newState);
    onFollowChange(user.userId, newState);
  };

  useEffect(() => {
    setLocalFollowState(user.isFollowing);
  }, [user.isFollowing]);

  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={<Avatar src={user.avatarUrl} alt={user.userName} />}
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
