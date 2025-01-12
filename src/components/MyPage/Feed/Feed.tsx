import { BookDetailPost, Review } from '@shared/types/type';
import ReviewFeedSection from './ReviewFeedSection';
import PostFeedSection from './PostFeedSection';

interface FeedProps {
  userId: string;
  reviews: Review[];
  posts: BookDetailPost[];
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
