import { Box, IconButton, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { formatCount } from '@shared/utils/formatCount';
import { useNavigate } from 'react-router-dom';
import { postingDetailStyles } from './PostingDetail.styles';
import { useDispatch, useSelector } from 'react-redux';
import { useToggleLikeMutation } from '@features/commons/likeApi';
import { RootState } from '@store/index';
import { updateLikeStatus } from '@features/PostDetailPage/slice/postingDetailSlice';
import { Posting } from '@shared/types/type';

interface PostingHeaderProps {
  title: string;
  setOpenShareDialog: (value: boolean) => void;
  postingId: number;
  userId: number;
  currentUserId: number;
}

const PostingHeader = ({
  title,
  setOpenShareDialog,
  postingId,
  userId,
  currentUserId,
}: PostingHeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleLike] = useToggleLikeMutation();
  const { isLiked, likeCount } = useSelector(
    (state: RootState) => (state.postingDetail.currentPost || {}) as Posting,
  );

  const handleLikeClick = async () => {
    try {
      await toggleLike({ postId: postingId, isLiked: !isLiked }).unwrap();
      dispatch(updateLikeStatus(!isLiked));
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem('isPostingDetail');
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/posting/edit/${postingId}`);
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
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default PostingHeader;
