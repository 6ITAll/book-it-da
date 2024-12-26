import { Box, Typography, Stack } from '@mui/material';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import ReviewCard from '@components/commons/DetailPageReviewCard';
import { useState } from 'react';
import StarRatingBox from '@components/commons/StarRatingBox';
import ReviewSortOptions from '@components/ReviewMorePage/ReviewSortOptions';
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
  const [reviews, setReviews] = useState(allMockReviews.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState('likes');

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

  return (
    <Box
      sx={{
        padding: '1rem',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      <StarRatingBox />
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

      <InfiniteScrollComponent
        items={reviews}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(review) => <ReviewCard {...review} />}
      />
    </Box>
  );
};

export default ReviewMorePage;
