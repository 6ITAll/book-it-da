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
}

const Feed = ({
  username,
  oneLineReviews,
  postings,
  oneLineReviewsCount,
  postingsCount,
}: FeedProps): JSX.Element => {
  return (
    <>
      <OneLineReviewSection
        username={username}
        oneLineReviews={oneLineReviews}
        oneLineReviewCount={oneLineReviewsCount}
      />
      <PostingFeedSection
        username={username}
        postings={postings}
        postingCount={postingsCount}
      />
    </>
  );
};

export default Feed;
