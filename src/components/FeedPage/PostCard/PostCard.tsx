import { Box, Card } from '@mui/material';
import { PostType } from '@shared/types/type';
import styles from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostCardHeader';
import PostCardFooter from './PostCardFooter';
import { navigateToPostingDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';
import PostCardSkeleton from './PostCardSkeleton';

interface PostCardBaseProps {
  postId: string;
  createdAt: string;
  user: {
    id: string;
    username?: string;
    avatarUrl?: string;
  };
  book: {
    isbn: string;
  };
  postType: Exclude<PostType, '선택안함'>;
}

interface PostingCardProps extends PostCardBaseProps {
  postType: '포스팅';
  title: string;
  content: string;
  review?: never; // 한줄평에서는 사용되지 않음
}

interface OneLineCardProps extends PostCardBaseProps {
  postType: '한줄평';
  review: string;
  title?: never; // 포스팅에서는 사용되지 않음
  content?: never; // 포스팅에서는 사용되지 않음
}

type PostCardProps = PostingCardProps | OneLineCardProps;

const PostCard = ({
  postId,
  createdAt,
  user,
  book,
  postType,
  title: postTitle,
  content: postContent,
  review,
}: PostCardProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    data: bookInfo,
    isLoading,
    error,
  } = useSearchBookByIsbnQuery({
    isbn: book.isbn,
  });

  const handleCardClick = (postId: string) => {
    if (postType === '포스팅') {
      navigateToPostingDetailPage(navigate, postId);
    }
  };

  if (isLoading) return <PostCardSkeleton postType={postType} />;
  if (error) return <div>Error fetching book information</div>;

  return (
    <Card sx={styles.card}>
      <PostCardHeader user={user} createdAt={createdAt} postType={postType} />
      {/* 책 사진 */}
      <Box onClick={() => handleCardClick(postId)}>
        <BookImage imageUrl={bookInfo!.cover} title={bookInfo!.title} />
        {/* 포스팅 내용 */}
        <PostCardContent
          type={postType}
          content={
            postType === '포스팅'
              ? {
                  postTitle,
                  postContent,
                }
              : {
                  title: bookInfo!.title,
                  author: bookInfo!.author,
                  review,
                }
          }
        />
      </Box>
      <PostCardFooter postId={postId} isbn={book.isbn} />
    </Card>
  );
};

export default PostCard;
