import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPaginatedReviewsQuery } from '@features/BookDetailPage/api/reviewApi';
import { Review } from '@shared/types/type';
import ReviewMorePageTemplate from '@components/ReviewMorePage/ReviewMorePageTemplate';

const ReviewMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { title, imageUrl, author, itemId } = bookDetails || {};

  const [reviews, setReviews] = useState<Review[]>([]); // 가져온 리뷰 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  // 페이지네이션 데이터 가져오기
  const { data, isLoading, isError } = useGetPaginatedReviewsQuery({
    itemId,
    page,
  });

  useEffect(() => {
    if (data?.reviews) {
      // 새로운 데이터를 기존 리뷰 리스트에 추가
      setReviews((prevReviews) => [...prevReviews, ...data.reviews]);

      // 데이터가 더 이상 없으면 hasMore를 false로 설정
      if (data.reviews.length < 5) {
        setHasMore(false);
      }
    }
  }, [data]);

  // 무한 스크롤: 다음 데이터 요청
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
      bookDetails={{
        title,
        imageUrl,
        author,
        itemId,
      }}
    />
  );
};

export default ReviewMorePage;
