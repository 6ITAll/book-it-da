import { Avatar, Box, Button, CardHeader, Typography } from '@mui/material';
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
  const currentUserId = useSelector(
    (state: RootState) => state.user.userInfo?.id,
  );
  const isOwnPost = currentUserId === user.id;

  const { data: followStatus, refetch } = useCheckFollowStatusQuery(user.id, {
    skip: isOwnPost,
  });

  const [toggleFollow] = useToggleFollowMutation();

  const handleAvatarClick = () => {
    navigateToUserPage(navigate, user.id);
  };

  const handleFollowClick = async () => {
    if (isOwnPost) return;
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
        !isOwnPost && (
          <Button
            variant="outlined"
            size="small"
            sx={styles.followButton(followStatus?.isFollowing)}
            onClick={handleFollowClick}
          >
            {followStatus?.isFollowing ? '팔로잉' : '팔로우'}
          </Button>
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
