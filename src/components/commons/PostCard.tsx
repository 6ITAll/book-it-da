import {
  Card,
  Typography,
  Avatar,
  Stack,
  Button,
  useTheme,
  Box,
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
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';

interface PostCardProps {
  postId: string;
  title: string;
  content: string;
  isbn: string;
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
  isbn,
  user,
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: bookInfo } = useSearchBookByIsbnQuery({ isbn });

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
        cursor: 'pointer',
      }}
      onClick={() => handleCardClick(postId)}
    >
      <Stack direction="row" spacing={2} sx={{ padding: '16px' }}>
        {/* 책 이미지 */}
        <img
          src={bookInfo?.cover}
          alt={title}
          style={{
            width: '20%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
        {/* 제목 및 내용 */}
        <Stack sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            gutterBottom
            sx={{ marginBottom: '0.5rem' }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {plainContent}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: '16px',
        }}
      >
        {/* 유저 정보 */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ flex: 1, maxWidth: '80%' }}
        >
          <Avatar
            onClick={(e) => {
              e.stopPropagation(); // 클릭 이벤트 전파 방지
              navigateToUserPage(navigate, user.id);
            }}
            src={user?.avatarUrl}
            alt={user?.username}
            sx={{ width: 40, height: 40, cursor: 'pointer' }}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexGrow: 1,
            }}
          >
            {user?.username}
          </Typography>
        </Stack>

        <Box
          sx={{
            width: '20%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* 팔로우 버튼 */}
          {isLoggedIn && !isOwnPost && (
            <Button
              variant="outlined"
              size="small"
              sx={styles.followButton(followStatus?.isFollowing)}
              onClick={(e) => {
                e.stopPropagation(); // 클릭 이벤트 전파 방지
                handleFollowClick();
              }}
            >
              {followStatus?.isFollowing ? '팔로잉' : '팔로우'}
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default PostCard;
