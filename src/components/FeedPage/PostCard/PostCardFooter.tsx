import { Button, CardActions, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import styles from './PostCard.styles';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import {
  useCheckLikeStatusQuery,
  useToggleLikeMutation,
} from '@features/commons/likeApi';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface PostCardFooterProps {
  postId: string;
  isbn: string;
}

const PostCardFooter = ({ postId, isbn }: PostCardFooterProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const { data: likeStatus, refetch } = useCheckLikeStatusQuery(postId);
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
    <CardActions disableSpacing sx={styles.cardFooter}>
      <Button
        fullWidth
        startIcon={
          likeStatus?.isLiked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )
        }
        sx={styles.cardFooterButton(true)(theme)}
        onClick={handleLike}
      >
        {likeStatus?.likeCount || 0}
      </Button>
      <Button
        fullWidth
        startIcon={<MenuBookIcon />}
        sx={styles.cardFooterButton(false)(theme)}
        onClick={() => navigateToBookDetailPage(navigate, isbn)}
      >
        책 보러가기
      </Button>
    </CardActions>
  );
};

export default PostCardFooter;
