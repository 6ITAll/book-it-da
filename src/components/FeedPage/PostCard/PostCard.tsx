import { Box, Card } from '@mui/material';
import { Book, PostType, User } from '@shared/types/type';
import styles from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostHeader';
import PostCardFooter from './PostCardFooter';
import { useToggleLikeMutation } from '@features/FeedPage/api/feedApi';
import { navigateToPostingDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface PostCardBaseProps {
  postId: number;
  createdAt: string;
  user: User;
  book: Book;
  postType: PostType;
  likeCount: number;
  isLiked: boolean;
  onFollowChange: (userId: number, isFollowing: boolean) => void;
}

interface PostingCardProps extends PostCardBaseProps {
  postType: '포스팅';
  title: string;
  content: string;
  review?: never;
}

interface OneLineCardProps extends PostCardBaseProps {
  postType: '한줄평';
  review: string;
  title?: never;
  content?: never;
}

type PostCardProps = PostingCardProps | OneLineCardProps;

const PostCard = ({
  postId,
  createdAt,
  user,
  book,
  postType,
  title,
  content,
  review,
  likeCount,
  isLiked,
  onFollowChange,
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeClick = async (postId: number, isLiked: boolean) => {
    try {
      const result = await toggleLike({ postId, isLiked }).unwrap();
      if (!result.success) {
        console.error('좋아요 처리 실패');
      }
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handleCardClick = (postId: number) => {
    if (postType === '포스팅') {
      navigateToPostingDetailPage(navigate, postId);
    }
  };

  return (
    <Card sx={styles.card}>
      <PostCardHeader
        user={user}
        createdAt={createdAt}
        postType={postType}
        onFollowChange={onFollowChange}
      />
      {/* 책 사진 */}
      <Box onClick={() => handleCardClick(postId)}>
        <BookImage imageUrl={book.imageUrl} title={book.bookTitle} />
        {/* 포스팅 내용 */}
        <PostCardContent
          type={postType}
          content={
            postType === '포스팅'
              ? {
                  book,
                  title,
                  content,
                }
              : {
                  book,
                  review,
                }
          }
        />
      </Box>
      <PostCardFooter
        postId={postId}
        likeCount={likeCount}
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        itemId={book.itemId}
      />
    </Card>
  );
};

export default PostCard;
