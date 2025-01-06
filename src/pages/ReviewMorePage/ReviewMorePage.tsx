import { Box, Typography, Stack } from '@mui/material';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import ReviewCard from '@components/commons/DetailPageReviewCard';
import { useState, useEffect } from 'react';
import ReviewSortOptions from '@components/ReviewMorePage/ReviewSortOptions';
import StarRating from '@components/commons/StarRating';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import { useLocation } from 'react-router-dom';
import { useGetPaginatedReviewsQuery } from '@features/BookDetailPage/api/reviewApi';
import { Review } from '@shared/types/type';

const ReviewMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { title, imageUrl, author, itemId } = bookDetails || {};

  const [reviews, setReviews] = useState<Review[]>([]); // 가져온 리뷰 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [sortOption, setSortOption] = useState('likes'); // 정렬 옵션
  const [selectedRating, setSelectedRating] = useState<number>(0); // 별점 상태
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // 모달 상태

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

  // 정렬 옵션 변경 처리
  const handleSortChange = (option: string) => {
    setSortOption(option);

    // 정렬 로직 적용
    setReviews((prevReviews) => {
      const sortedReviews = [...prevReviews];
      if (option === 'likes') {
        sortedReviews.sort((a, b) => b.likes - a.likes);
      } else if (option === 'ratingHigh') {
        sortedReviews.sort((a, b) => b.rating - a.rating);
      } else if (option === 'ratingLow') {
        sortedReviews.sort((a, b) => a.rating - b.rating);
      } else if (option === 'latest') {
        sortedReviews.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }
      return sortedReviews;
    });
  };

  // 별점 변경 처리
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setIsDialogOpen(true); // 별점 클릭 시 모달 열기
  };

  // 모달 닫기 처리
  const handleModalClose = () => {
    setIsDialogOpen(false); // 모달 닫기
  };

  return (
    <Box
      sx={{
        padding: '1rem',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      {/* StarRating 박스 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          border: '1px solid #e7e8e9',
          borderRadius: '8px',
          marginBottom: '1.5rem',
        }}
      >
        <StarRating
          rating={selectedRating}
          onRatingChange={handleRatingChange}
          isDialog={false}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: '0.5rem' }}
        >
          이 책은 어떠셨나요? 별점을 남겨주세요
        </Typography>
      </Box>

      {/* 제목 및 정렬 옵션 */}
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginBottom: '1rem' }}
        >
          한 줄 리뷰 {reviews.length}
        </Typography>
        <ReviewSortOptions value={sortOption} onChange={handleSortChange} />
      </Stack>

      {/* 무한 스크롤 */}
      <InfiniteScrollComponent
        items={reviews}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(review) => <ReviewCard {...review} />}
      />

      {/* 한 줄 리뷰 작성 모달 */}
      <OneLineReviewDialog
        isOpen={isDialogOpen}
        onClose={handleModalClose}
        receivedBook={{
          bookTitle: title!,
          imageUrl: imageUrl!,
          author: author!,
          itemId: itemId!,
        }}
        receivedRating={selectedRating}
      />
    </Box>
  );
};

export default ReviewMorePage;
