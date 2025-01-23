import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
  useTheme,
} from '@mui/material';
import { User } from '@shared/types/type';
import {
  navigateToPostingDetailPage,
  navigateToUserPage,
} from '@shared/utils/navigation';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';
import { Theme } from '@mui/material';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface PostCardProps {
  postId: string;
  title: string;
  content: string;
  user: User;
}

const styles = {
  followButton: (isFollowing: boolean | undefined) => (theme: Theme) => ({
    color: isFollowing
      ? theme.palette.getContrastText(theme.palette.secondary.main)
      : theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: isFollowing
      ? theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark
      : theme.palette.mode === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    border: 'none',
    mb: '0',
    '&:hover': {
      backgroundColor: isFollowing
        ? theme.palette.mode === 'light'
          ? theme.palette.secondary.dark
          : theme.palette.secondary.main
        : theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
  }),
};

const PostCard = ({
  postId,
  title,
  content,
  user,
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.user,
  );
  const isOwnPost = userInfo?.id === user.id;

  const { data: followStatus, refetch } = useCheckFollowStatusQuery(user.id, {
    skip: !isLoggedIn || isOwnPost,
  });
  const [toggleFollow] = useToggleFollowMutation();

  const handleFollowClick = async () => {
    if (!isLoggedIn || isOwnPost) return;
    try {
      await toggleFollow(user.id);
      refetch();
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  const handleCardClick = (postId: string) => {
    navigateToPostingDetailPage(navigate, postId);
  };

  const plainContent = useMemo(
    () => stripHtml(content || '내용 없음').result,
    [content],
  );
  return (
    <Card
      sx={{
        borderRadius: '12px',
        border: theme.palette.border.dark,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onClick={() => handleCardClick(postId)}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          gutterBottom
          sx={{ marginBottom: '1rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
            overflow: 'hidden',
          }}
        >
          {plainContent}
        </Typography>
      </CardContent>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ borderTop: '1px solid #e7e8e9', paddingTop: '1rem' }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              onClick={() => navigateToUserPage(navigate, user.id)}
              src={user?.avatarUrl}
              alt={user?.username}
              sx={{ width: 40, height: 40, cursor: 'pointer' }}
            />
            <Typography variant="body2" fontWeight="bold">
              {user?.username}
            </Typography>
          </Stack>
          {isLoggedIn && !isOwnPost && (
            <Button
              variant="outlined"
              size="small"
              sx={styles.followButton(followStatus?.isFollowing)}
              onClick={handleFollowClick}
            >
              {followStatus?.isFollowing ? '팔로잉' : '팔로우'}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
