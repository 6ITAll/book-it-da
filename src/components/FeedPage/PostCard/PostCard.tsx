import { Box, Card } from '@mui/material';
import { Book, PostType, User } from '@shared/types/type';
import styles from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostHeader';
import PostCardFooter from './PostCardFooter';
import { navigateToPostingDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface PostCardBaseProps {
  postId: number;
  createdAt: string;
  user: User;
  book: Book;
  postType: PostType;
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
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleCardClick = (postId: number) => {
    if (postType === '포스팅') {
      navigateToPostingDetailPage(navigate, postId);
    }
  };

  return (
    <Card sx={styles.card}>
      <PostCardHeader user={user} createdAt={createdAt} postType={postType} />
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
      <PostCardFooter postId={postId} itemId={book.itemId} />
    </Card>
  );
};

export default PostCard;
