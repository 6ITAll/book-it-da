import { Button, CardActions, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import styles from './PostCard.styles';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface PostCardFooterProps {
  postId: number;
  likeCount: number;
  isLiked: boolean;
  itemId: number;
  handleLikeClick: (postId: number, isLiked: boolean) => void;
}

const PostCardFooter = ({
  postId,
  likeCount,
  isLiked,
  itemId,
  handleLikeClick,
}: PostCardFooterProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <CardActions disableSpacing sx={styles.cardFooter}>
      <Button
        fullWidth
        startIcon={
          isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />
        }
        sx={styles.cardFooterButton(true)(theme)}
        onClick={() => handleLikeClick(postId, !isLiked)}
      >
        {likeCount}
      </Button>
      <Button
        fullWidth
        startIcon={<MenuBookIcon />}
        sx={styles.cardFooterButton(false)(theme)}
        onClick={() => navigateToBookDetailPage(navigate, itemId)}
      >
        책 보러가기
      </Button>
    </CardActions>
  );
};

export default PostCardFooter;
