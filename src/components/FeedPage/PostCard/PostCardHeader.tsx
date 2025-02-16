import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './PostCard.styles';
import { PostType } from '@shared/types/type';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/index';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';
import { useSelector } from 'react-redux';

interface PostCardHeaderProps {
  user: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  createdAt: string;
  postType: PostType;
}

const PostCardHeader = ({
  user,
  createdAt,
  postType,
}: PostCardHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.user,
  );
  const isOwnPost = userInfo?.id === user.id;
  const { data: followStatus, refetch } = useCheckFollowStatusQuery(user.id, {
    skip: !isLoggedIn || isOwnPost,
  });
  const [toggleFollow] = useToggleFollowMutation();

  const handleAvatarClick = () => {
    navigateToUserPage(navigate, user.username ?? '');
  };

  const handleFollowClick = async () => {
    if (!isLoggedIn || isOwnPost) return;
    try {
      await toggleFollow(user.id);
      refetch();
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  return (
    <CardHeader
      sx={styles.cardHeader}
      avatar={
        <Avatar
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer' }}
          src={user.avatarUrl}
          alt={user.username}
        />
      }
      action={
        isLoggedIn &&
        !isOwnPost && (
          <>
            {followStatus?.isFollowing ? (
              <IconButton
                sx={{ backgroundColor: 'transparent' }}
                onClick={handleFollowClick}
              >
                <CheckCircleIcon sx={{ color: '#0095f6', fontSize: 32 }} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                size="small"
                sx={styles.followButton(followStatus?.isFollowing)}
                onClick={handleFollowClick}
              >
                팔로우
              </Button>
            )}
          </>
        )
      }
      title={
        <Typography variant="body2" fontWeight="bold">
          {user.username}
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
