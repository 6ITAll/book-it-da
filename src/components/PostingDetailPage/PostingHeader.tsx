import { Box, IconButton, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { formatCount } from '@shared/utils/formatCount';
import { useToggleLikeMutation } from '@features/PostDetailPage/api/postingApi';
import { useNavigate } from 'react-router-dom';
import { postingDetailStyles } from './postingDetail.styles';

interface PostingHeaderProps {
  title: string;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  setOpenShareDialog: (value: boolean) => void;
  postingId: number;
  userId: number;
  currentUserId: number;
  likeCount: number;
}

const PostingHeader = ({
  title,
  isLiked,
  setIsLiked,
  setOpenShareDialog,
  postingId,
  userId,
  currentUserId,
  likeCount,
}: PostingHeaderProps) => {
  const navigate = useNavigate();
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeClick = async () => {
    try {
      await toggleLike(Number(postingId));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem('isPostingDetail');
    navigate(-1);
  };

  return (
    <Box sx={postingDetailStyles.postingHeader}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* 좋아요 버튼 */}
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={handleLikeClick}>
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="caption" sx={postingDetailStyles.likeCount}>
            {formatCount(likeCount)}
          </Typography>
        </Box>
        {/* 공유 버튼 */}
        <IconButton onClick={() => setOpenShareDialog(true)}>
          <ShareIcon />
        </IconButton>
        {/* 수정 버튼 */}
        {userId === currentUserId && (
          <IconButton>
            <EditIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default PostingHeader;
