import { Button, CardActions } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styles } from './PostCard.styles';

interface PostCardFooterProps {
  onLikeClick?: () => void;
  onBookClick?: () => void;
}

const PostCardFooter = ({ onLikeClick, onBookClick }: PostCardFooterProps) => (
  <CardActions disableSpacing sx={styles.cardFooter}>
    <Button
      fullWidth
      startIcon={<FavoriteBorderIcon />}
      sx={styles.cardFooterButton(true)}
      onClick={onLikeClick}
    >
      좋아요
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
