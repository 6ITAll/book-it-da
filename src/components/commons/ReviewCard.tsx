import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  useCheckLikeStatusQuery,
  useToggleLikeMutation,
} from '@features/commons/likeApi';
import {
  useCheckFollowStatusQuery,
  useToggleFollowMutation,
} from '@features/commons/followApi';

interface ReviewCardProps {
  postId: string;
  // 리뷰 작성자의 고유 ID를 props로 받아 follow 체크에 사용합니다.
  userId: string;
  username: string;
  avatarUrl: string;
  date: string;
  content: string;
  rating: number;
  isbn: string;
}

const ReviewCard = ({
  postId,
  userId,
  username,
  avatarUrl,
  date,
  content,
  rating,
}: ReviewCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.user,
  );

  // 좋아요 관련 API 호출
  const { data: likeStatus, refetch: refetchLike } = useCheckLikeStatusQuery(
    postId,
    { skip: !isLoggedIn },
  );
  const [toggleLike] = useToggleLikeMutation();
  const handleLike = async () => {
    if (!isLoggedIn) return;
    try {
      await toggleLike(postId);
      refetchLike();
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  // 팔로우 관련 API 호출
  const isOwnReview = userInfo?.id === userId;
  const { data: followStatus, refetch: refetchFollow } =
    useCheckFollowStatusQuery(userId, { skip: !isLoggedIn || isOwnReview });
  const [toggleFollow] = useToggleFollowMutation();
  const handleFollowClick = async () => {
    if (!isLoggedIn || isOwnReview) return;
    try {
      await toggleFollow(userId);
      refetchFollow();
    } catch (error) {
      console.error('팔로우 토글 실패:', error);
    }
  };

  return (
    <Card sx={{ border: theme.palette.border.dark }}>
      <CardContent>
        {/* 헤더 영역: 좌측은 아바타, 이름, 날짜 / 우측은 팔로우/언팔로우 아이콘 */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={avatarUrl}
              alt={username}
              onClick={() => navigateToUserPage(navigate, username)}
              sx={{ cursor: 'pointer' }}
            />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {date}
              </Typography>
            </Box>
          </Stack>
          {/* 로그인 상태이고, 본인이 작성한 리뷰가 아니라면 팔로우 버튼 표시 */}
          {isLoggedIn && !isOwnReview && (
            <>
              {followStatus?.isFollowing ? (
                <IconButton
                  onClick={handleFollowClick}
                  sx={{ backgroundColor: 'transparent' }}
                >
                  <PersonRemoveIcon sx={{ fontSize: 32 }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleFollowClick}
                  sx={{ backgroundColor: 'transparent' }}
                >
                  <PersonAddAlt1Icon sx={{ color: '#0095f6', fontSize: 32 }} />
                </IconButton>
              )}
            </>
          )}
        </Stack>
        {/* 별점 표시 */}
        <Stack direction="row" spacing={0.5} sx={{ marginTop: '0.5rem' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} sx={{ color: index < rating ? 'gold' : '#ccc' }}>
              {index < rating ? (
                <StarIcon fontSize="small" />
              ) : (
                <StarOutlineIcon fontSize="small" />
              )}
            </Box>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
          {content}
        </Typography>
        <Button
          size="small"
          startIcon={
            likeStatus?.isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          sx={{
            marginTop: '0.5rem',
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
          onClick={handleLike}
        >
          좋아요 {likeStatus?.likeCount || 0}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
