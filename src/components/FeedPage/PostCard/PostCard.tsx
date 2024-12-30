import { Card } from '@mui/material';
import { FeedType, PostType } from '@shared/types/type';
import { styles } from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostHeader';
import PostCardFooter from './PostCardFooter';

interface PostCardProps {
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: PostType;
  feedType: FeedType;
  bookTitle: string;
  bookAuthor: string;
}

const PostCard = ({
  title,
  description,
  imageUrl,
  userName,
  timeAgo,
  postType,
  feedType,
  bookTitle,
  bookAuthor,
}: PostCardProps): JSX.Element => {
  return (
    <Card sx={styles.card}>
      <PostCardHeader
        userName={userName}
        postType={postType}
        timeAgo={timeAgo}
        feedType={feedType}
      />
      {/* 책 사진 */}
      <BookImage imageUrl={imageUrl} title={title} />
      {/* 포스팅 내용 */}
      <PostCardContent
        type={postType}
        content={{
          bookTitle,
          bookAuthor,
          title,
          description,
        }}
      />
      <PostCardFooter onLikeClick={() => {}} onBookClick={() => {}} />
    </Card>
  );
};

export default PostCard;
