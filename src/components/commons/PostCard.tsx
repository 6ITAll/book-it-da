import {
  Card,
  Typography,
  Avatar,
  Stack,
  useTheme,
  Box,
  IconButton,
} from '@mui/material';
import { User } from '@shared/types/type';
import {
  navigateToPostingDetailPage,
  navigateToUserPage,
} from '@shared/utils/navigation';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

interface PostCardProps {
  postId: string;
  title: string;
  content: string;
  isbn: string;
  user: User;
}

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
      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: '16px', height: '100%' }}
      >
        {/* 책 이미지 */}
        <img
          src={bookInfo?.cover}
          alt={title}
          style={{
            aspectRatio: '3 / 4',
            width: '20%',
            height: '100%',
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
              navigateToUserPage(navigate, user?.username || '');
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
          {isLoggedIn && !isOwnPost && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleFollowClick();
              }}
              sx={{ backgroundColor: 'transparent' }}
            >
              {followStatus?.isFollowing ? (
                <PersonRemoveIcon sx={{ fontSize: 28 }} />
              ) : (
                <PersonAddAlt1Icon sx={{ color: '#0095f6', fontSize: 28 }} />
              )}
            </IconButton>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default PostCard;
