import { Card } from '@mui/material';
import { PostType } from '@shared/types/type';
import { styles } from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostHeader';
import PostCardFooter from './PostCardFooter';

interface PostCardBaseProps {
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: PostType;
  bookTitle: string;
  bookAuthor: string;
  isFollowing: boolean;
}

interface PostingCardProps extends PostCardBaseProps {
  postType: '포스팅';
  title: string;
  description: string;
  review?: never;
}

interface OneLineCardProps extends PostCardBaseProps {
  postType: '한줄평';
  review: string;
  title?: never;
  description?: never;
}

type PostCardProps = PostingCardProps | OneLineCardProps;

const PostCard = ({
  imageUrl,
  userName,
  timeAgo,
  postType,
  bookTitle,
  bookAuthor,
  title,
  description,
  review,
  isFollowing,
}: PostCardProps): JSX.Element => {
  return (
    <Card sx={styles.card}>
      <PostCardHeader
        userName={userName}
        postType={postType}
        timeAgo={timeAgo}
        isFollowing={isFollowing}
      />
      {/* 책 사진 */}
      <BookImage imageUrl={imageUrl} title={bookTitle} />
      {/* 포스팅 내용 */}
      <PostCardContent
        type={postType}
        content={
          postType === '포스팅'
            ? {
                bookTitle,
                bookAuthor,
                title,
                description,
              }
            : {
                bookTitle,
                bookAuthor,
                review,
              }
        }
      />
      <PostCardFooter onLikeClick={() => {}} onBookClick={() => {}} />
    </Card>
  );
};

export default PostCard;
