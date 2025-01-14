import { useState, useEffect } from 'react';
import { Review } from '@shared/types/type';
import ReviewMorePageTemplate from '@components/ReviewMorePage/ReviewMorePageTemplate';
import { useGetLikedPaginatedFeedsQuery } from '@features/MyPage/api/userFeedsApi';

const LikedReviewMorePage = (): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]); // 가져온 리뷰 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  const { data, isLoading, isError } = useGetLikedPaginatedFeedsQuery({
    userId: 'user',
    feedType: 'review',
    page,
  });

  useEffect(() => {
    if (data?.feeds) {
      const newReviews = data.feeds.filter(
        (feed): feed is Review => 'username' in feed,
      );
      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      setHasMore(reviews.length + newReviews.length < data.totalFeeds);
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && !isError && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ReviewMorePageTemplate
      reviews={reviews}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default LikedReviewMorePage;
