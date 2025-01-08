import { Review } from '@shared/types/type';
/* TODO - Post interface 통합 후 @shared/types/type Post로 변경 필요 */
import { Post } from '@components/BookDetailPage/BookReviewTab';
import ReviewFeedSection from './ReviewFeedSection';
import PostFeedSection from './PostFeedSection';

interface FeedProps {
  userId: string;
  reviews: Review[];
  posts: Post[];
}

const Feed = ({ userId, reviews, posts }: FeedProps): JSX.Element => {
  return (
    <>
      <ReviewFeedSection userId={userId} reviews={reviews} />
      <PostFeedSection userId={userId} posts={posts} />
    </>
  );
};

export default Feed;
