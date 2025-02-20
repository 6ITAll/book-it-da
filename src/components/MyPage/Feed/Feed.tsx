import { OneLineReview, Posting } from '../types';
import OneLineReviewSection from './OneLineReviewSection';
import PostingFeedSection from './PostingSection';

interface FeedProps {
  userId: string;
  username: string;
  oneLineReviews: OneLineReview[];
  postings: Posting[];
  oneLineReviewsCount: number;
  postingsCount: number;
  type: string;
}

const Feed = ({
  userId,
  username,
  oneLineReviews,
  postings,
  oneLineReviewsCount,
  postingsCount,
  type,
}: FeedProps): JSX.Element => {
  return (
    <>
      <OneLineReviewSection
        userId={userId}
        username={username}
        oneLineReviews={oneLineReviews}
        oneLineReviewCount={oneLineReviewsCount}
        type={type}
      />
      <PostingFeedSection
        username={username}
        postings={postings}
        postingCount={postingsCount}
        type={type}
      />
    </>
  );
};

export default Feed;
