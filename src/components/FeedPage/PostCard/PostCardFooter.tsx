import { Button, CardActions, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import styles from './PostCard.styles';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { useToggleLikeMutation } from '@features/commons/likeApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikeStatus } from '@features/FeedPage/slice/feedSlice';
import { RootState } from '@store/index';

interface PostCardFooterProps {
  postId: string;
  isbn: string;
}

const PostCardFooter = ({ postId, isbn }: PostCardFooterProps): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [toggleLike] = useToggleLikeMutation();
  const dispatch = useDispatch();

  const post = useSelector((state: RootState) =>
    state.feed.posts.find((post) => post.id === postId),
  );
  const isLiked = post?.isLiked ?? false;
  const likeCount = post?.likeCount ?? 0;

  const handleLike = async (postId: string, isLiked: boolean) => {
    try {
      await toggleLike({ postId, isLiked }).unwrap();
      dispatch(updateLikeStatus({ postId, isLiked }));
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  return (
    <CardActions disableSpacing sx={styles.cardFooter}>
      <Button
        fullWidth
        startIcon={
          isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />
        }
        sx={styles.cardFooterButton(true)(theme)}
        onClick={() => handleLike(postId, !isLiked)}
      >
        {likeCount}
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
