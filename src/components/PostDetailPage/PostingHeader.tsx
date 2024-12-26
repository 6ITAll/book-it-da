import { Box, IconButton, Typography, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

interface PostingHeaderProps {
  title: string;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  setOpenShareDialog: (value: boolean) => void;
  userId: number;
  currentUserId: number;
}

const PostingHeader = ({
  title,
  isLiked,
  setIsLiked,
  setOpenShareDialog,
  userId,
  currentUserId,
}: PostingHeaderProps) => {
  return (
    <Box
      sx={{
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
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton onClick={() => setOpenShareDialog(true)}>
          <ShareIcon />
        </IconButton>
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
