import { useState, useEffect } from 'react';
import { Review, OneLinePost } from '@shared/types/type';
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
      // data.feeds에서 Review 타입으로 변환하여 설정
      const newReviews = data.feeds
        .filter((feed): feed is OneLinePost => feed.postType === '한줄평') // 한줄평만 필터링 +타입 가드 사용
        .map((feed) => ({
          username: feed.user.userName,
          date: feed.createdAt,
          content: feed.review,
          likes: feed.likeCount,
          rating: feed.rating || 0,
        }));

      setReviews((prevReviews) => [...prevReviews, ...newReviews]);
      if (newReviews.length < 5) setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && !isError) {
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
