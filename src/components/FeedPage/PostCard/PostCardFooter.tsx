import { Button, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styles } from './PostCard.styles';

interface PostCardFooterProps {
  postId: number;
  likeCount: number;
  isLiked: boolean;
  handleLikeClick: (postId: number, isLiked: boolean) => void;
  onBookClick?: () => void;
}

const PostCardFooter = ({
  postId,
  likeCount,
  isLiked,
  handleLikeClick,
  onBookClick,
}: PostCardFooterProps) => (
  <CardActions disableSpacing sx={styles.cardFooter}>
    <Button
      fullWidth
      startIcon={
        isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />
      }
      sx={styles.cardFooterButton(true)}
      onClick={() => handleLikeClick(postId, !isLiked)}
    >
      {likeCount}
    </Button>
    <Button
      fullWidth
      startIcon={<MenuBookIcon />}
      sx={styles.cardFooterButton(false)}
      onClick={onBookClick}
    >
      책 보러가기
    </Button>
  </CardActions>
);

export default PostCardFooter;
