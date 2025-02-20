import { Box, IconButton, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { formatCount } from '@shared/utils/formatCount';
import { useNavigate } from 'react-router-dom';
import { postingDetailStyles } from './PostingDetail.styles';
import { useEffect, useState } from 'react';
import {
  useCheckLikeStatusQuery,
  useToggleLikeMutation,
} from '@features/commons/likeApi';
import {
  navigateBack,
  navigateToPostingEditPage,
} from '@shared/utils/navigation';

interface PostingHeaderProps {
  title: string;
  setOpenShareDialog: (value: boolean) => void;
  postingId: string;
  isUserOwnsPost: boolean;
}

const PostingHeader = ({
  title,
  setOpenShareDialog,
  postingId,
  isUserOwnsPost,
}: PostingHeaderProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data: likeStatus } = useCheckLikeStatusQuery(postingId);
  const [toggleLike] = useToggleLikeMutation();

  useEffect(() => {
    if (likeStatus) {
      setIsLiked(likeStatus.isLiked);
      setLikeCount(likeStatus.likeCount);
    }
  }, [likeStatus]);

  const handleLikeClick = async () => {
    try {
      const result = await toggleLike(postingId).unwrap();
      setIsLiked(result.isLiked);
      setLikeCount(result.likeCount);
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem('isPostingDetail');
    navigateBack(navigate);
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
        {isUserOwnsPost && (
          <IconButton
            onClick={() => navigateToPostingEditPage(navigate, postingId)}
          >
            <EditIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default PostingHeader;
