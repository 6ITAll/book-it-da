import { Box, Typography, Stack } from '@mui/material';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import ReviewCard from '@components/commons/DetailPageReviewCard';
import { useState } from 'react';
import ReviewSortOptions from '@components/ReviewMorePage/ReviewSortOptions';
import StarRating from '@components/commons/StarRating';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import { useLocation } from 'react-router-dom';
// Mock Data 생성
const generateMockReviews = () => {
  const mockData = [];
  for (let i = 1; i <= 50; i++) {
    mockData.push({
      username: `User${i}`,
      date: `2024.12.${(i % 30) + 1}`,
      content: `재밌어요 ${i} !`,
      likes: Math.floor(Math.random() * 10),
      rating: Math.floor(Math.random() * 5) + 1,
    });
  }
  return mockData;
};

const allMockReviews = generateMockReviews();

const ReviewMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { title, imageUrl, author, itemId } = bookDetails || {};
  const [reviews, setReviews] = useState(allMockReviews.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState('likes');
  const [selectedRating, setSelectedRating] = useState<number>(0); // 별점 상태 추가
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // 모달 상태 추가

  // 데이터 가져오는 함수 삭제 에정
  const fetchMoreData = () => {
    setTimeout(() => {
      const currentLength = reviews.length;
      if (currentLength >= allMockReviews.length) {
        setHasMore(false);
        return;
      }
      const nextReviews = allMockReviews.slice(
        currentLength,
        currentLength + 10,
      );
      setReviews((prevReviews) => [...prevReviews, ...nextReviews]);
    }, 1000);
  };

  // 정렬 변경 처리
  const handleSortChange = (option: string) => {
    setSortOption(option);

    const sortedReviews = [...reviews];
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
    setReviews(sortedReviews);
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
      {/* StarRating 박스 부분 */}
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
      <Stack
        direction={'row'}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginBottom: '1rem' }}
        >
          한 줄 리뷰 {allMockReviews.length}
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
