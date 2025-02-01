import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  useCheckLikeStatusQuery,
  useToggleLikeMutation,
} from '@features/commons/likeApi';

interface ReviewCardProps {
  postId: string;
  username: string;
  date: string;
  content: string;
  rating: number;
  isbn: string;
}

const ReviewCard = ({
  postId,
  username,
  date,
  content,
  rating,
}: ReviewCardProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const { data: likeStatus, refetch } = useCheckLikeStatusQuery(postId, {
    skip: !isLoggedIn,
  });
  const [toggleLike] = useToggleLikeMutation();

  const handleLike = async () => {
    if (!isLoggedIn) return;
    try {
      await toggleLike(postId);
      refetch();
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };
  return (
    <Card
      sx={{
        border: theme.palette.border.dark,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            onClick={() => navigateToUserPage(navigate, username)}
            sx={{ cursor: 'pointer' }}
          >
            {username.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Box>
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
