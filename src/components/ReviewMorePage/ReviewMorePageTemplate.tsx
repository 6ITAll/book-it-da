import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StarRating from '@components/commons/StarRating';
import ReviewSortOptions from '@components/ReviewMorePage/ReviewSortOptions';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import ReviewCard from '@components/commons/ReviewCard';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import { Book, Review } from '@shared/types/type';

interface BookDetail extends Omit<Book, 'bookTitle'> {
  title: string;
}

interface ReviewMorePageTemplateProps {
  reviews: Review[];
  hasMore: boolean;
  fetchMoreData: () => void;
  bookDetails?: BookDetail;
}

const ReviewMorePageTemplate: React.FC<ReviewMorePageTemplateProps> = ({
  reviews,
  hasMore,
  fetchMoreData,
  bookDetails,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0); // 별점 상태
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // 모달 상태
  const [sortOption, setSortOption] = useState<string>('likes'); // 정렬 상태
  const [sortedReviews, setSortedReviews] = useState<Review[]>(reviews); // 정렬된 리뷰

  useEffect(() => {
    const updatedReviews = [...reviews];
    if (sortOption === 'likes') {
      updatedReviews.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'ratingHigh') {
      updatedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'ratingLow') {
      updatedReviews.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'latest') {
      updatedReviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    setSortedReviews(updatedReviews);
  }, [reviews, sortOption]);

  // 별점 변경 처리
  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setIsDialogOpen(true);
  };

  // 모달 닫기 처리
  const handleModalClose = () => {
    setIsDialogOpen(false);
  };

  // 정렬 옵션 변경 처리
  const handleSortChange = (option: string) => {
    setSortOption(option);
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
      {bookDetails && (
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
      )}

      {/* 제목 및 정렬 옵션 */}
      <Stack direction="row" justifyContent="space-between" marginBottom="1rem">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          한 줄 리뷰 {sortedReviews.length}
        </Typography>
        <ReviewSortOptions value={sortOption} onChange={handleSortChange} />
      </Stack>

      {/* 무한 스크롤 */}
      <InfiniteScrollComponent
        items={sortedReviews} // 정렬된 리뷰를 전달
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(review) => <ReviewCard {...review} />}
      />

      {/* 한 줄 리뷰 작성 모달 */}
      {bookDetails && (
        <OneLineReviewDialog
          isOpen={isDialogOpen}
          onClose={handleModalClose}
          receivedBook={{
            bookTitle: bookDetails.title,
            imageUrl: bookDetails.imageUrl,
            author: bookDetails.author,
            itemId: bookDetails.itemId,
          }}
          receivedRating={selectedRating}
        />
      )}
    </Box>
  );
};

export default ReviewMorePageTemplate;
