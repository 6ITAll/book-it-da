import { useGetUserPostingReviewCountsQuery } from '@features/MyPage/api/userFeedsApi';
import { OneLineReview, Posting } from '../types';
import OneLineReviewSection from './OneLineReviewSection';
import PostFeedSection from './PostingSection';

interface FeedProps {
  userId: string;
  username: string;
  oneLineReviews: OneLineReview[];
  postings: Posting[];
}

const Feed = ({
  userId,
  username,
  oneLineReviews,
  postings,
}: FeedProps): JSX.Element => {
  const { data } = useGetUserPostingReviewCountsQuery({
    userId,
  });
  return (
    <>
      <OneLineReviewSection
        username={username}
        oneLineReviews={oneLineReviews}
        oneLineReviewCount={data?.total_reviews_count ?? 0}
      />
      <PostFeedSection
        userId={userId}
        postings={postings}
        postingCount={data?.total_postings_count ?? 0}
      />
    </>
  );
};

export default Feed;
