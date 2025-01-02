import { Box, IconButton, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { formatCount } from '@shared/utils/formatCount';
import { useToggleLikeMutation } from '@features/PostDetailPage/api/postingApi';

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

const styles = {
  postingHeader: {
    width: '100%',
    position: 'sticky',
    opacity: '0.9',
    top: 0,
    bgcolor: 'white',
    zIndex: 1000,
    borderBottom: '1px solid #eee',
    py: 2,
    px: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

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
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeClick = async () => {
    try {
      await toggleLike(Number(postingId));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 오류:', error);
    }
  };

  return (
    <Box sx={styles.postingHeader}>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* 좋아요 버튼 */}
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={handleLikeClick}>
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.75rem',
              color: 'text.secondary',
            }}
          >
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
