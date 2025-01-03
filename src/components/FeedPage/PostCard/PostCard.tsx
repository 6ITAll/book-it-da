import { Card } from '@mui/material';
import { PostType } from '@shared/types/type';
import { styles } from './PostCard.styles';
import PostCardContent from './PostCardContent';
import BookImage from './PostCardImage';
import PostCardHeader from './PostHeader';
import PostCardFooter from './PostCardFooter';
import { useToggleLikeMutation } from '@features/FeedPage/api/feedApi';

interface PostCardBaseProps {
  postId: number;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: PostType;
  bookTitle: string;
  bookAuthor: string;
  isFollowing: boolean;
  likeCount: number;
  isLiked: boolean;
  itemId: number;
  onFollowChange: (userName: string, isFollowing: boolean) => void;
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
  postId,
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
  likeCount,
  isLiked,
  itemId,
  onFollowChange,
}: PostCardProps): JSX.Element => {
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeClick = async (postId: number, isLiked: boolean) => {
    try {
      await toggleLike({ postId, isLiked }).unwrap();
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  return (
    <Card sx={styles.card}>
      <PostCardHeader
        userName={userName}
        postType={postType}
        timeAgo={timeAgo}
        isFollowing={isFollowing}
        onFollowChange={onFollowChange}
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
      <PostCardFooter
        postId={postId}
        likeCount={likeCount}
        isLiked={isLiked}
        handleLikeClick={handleLikeClick}
        itemId={itemId}
      />
    </Card>
  );
};

export default PostCard;
