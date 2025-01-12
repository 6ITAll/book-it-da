import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
import styles from './PostCard.styles';
import { PostType, User } from '@shared/types/type';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
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
}: PostCardHeaderProps): JSX.Element => {
  const navigate = useNavigate();

  // 아바타 클릭 핸들러
  const handleAvatarClick = () => {
    navigateToUserPage(navigate, user.userId);
  };

  const handleFollowClick = () => {
    onFollowChange(user.userId, !user.isFollowing);
  };

  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={
        <Avatar
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer' }}
          src={user.avatarUrl}
          alt={user.userName}
        />
      }
      action={
        <Button
          variant="outlined"
          size="small"
          sx={styles.followButton(user.isFollowing)}
          onClick={handleFollowClick}
        >
          {user.isFollowing ? '팔로잉' : '팔로우'}
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
