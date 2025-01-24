import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('likes');
  const [sortedReviews, setSortedReviews] = useState<Review[]>(reviews);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);

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

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setIsDialogOpen(true);
  };

  const handleModalClose = () => {
    setIsDialogOpen(false);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleDeleteModeToggle = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedReviews([]);
  };

  const handleReviewSelect = (index: number) => {
    setSelectedReviews((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleDeleteSelected = () => {
    const updatedReviews = sortedReviews.filter(
      (_, index) => !selectedReviews.includes(index),
    );
    setSortedReviews(updatedReviews);
    setSelectedReviews([]);
    setIsDeleteMode(false);
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
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

      <Stack direction="row" justifyContent="space-between" marginBottom="1rem">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          한 줄 리뷰 {sortedReviews.length}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<DeleteIcon />}
            onClick={handleDeleteModeToggle}
            color={isDeleteMode ? 'secondary' : 'primary'}
            variant={isDeleteMode ? 'contained' : 'outlined'}
            size="small"
          >
            {isDeleteMode ? '취소' : '삭제'}
          </Button>
          {isDeleteMode && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSelected}
              disabled={selectedReviews.length === 0}
            >
              선택 삭제 ({selectedReviews.length})
            </Button>
          )}
          <ReviewSortOptions value={sortOption} onChange={handleSortChange} />
        </Stack>
      </Stack>

      <InfiniteScrollComponent
        items={sortedReviews}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 6 }}
        renderItem={(review, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            {isDeleteMode && (
              <Checkbox
                checked={selectedReviews.includes(index)}
                onChange={() => handleReviewSelect(index)}
                sx={{ padding: '4px', marginRight: '8px' }}
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <ReviewCard {...review} />
            </Box>
          </Box>
        )}
      />

      {bookDetails && (
        <OneLineReviewDialog
          isOpen={isDialogOpen}
          onClose={handleModalClose}
          receivedBook={{
            title: bookDetails.title,
            imageUrl: bookDetails.imageUrl,
            author: bookDetails.author,
            isbn: bookDetails.isbn,
          }}
          receivedRating={selectedRating}
        />
      )}
    </Box>
  );
};

export default ReviewMorePageTemplate;
