import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRating from '@components/commons/StarRating';
import ReviewSortOptions from '@components/ReviewMorePage/ReviewSortOptions';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import ReviewCard from '@components/commons/ReviewCard';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import { Book } from '@shared/types/type';
import { OneLineReview } from '@components/MyPage/types';
import { formatDate } from '@shared/utils/dateUtils';
import { deleteReviews } from '@features/MyPage/slice/userReviewMoreSlice';
import { useDispatch } from 'react-redux';
import { useDeletePostsMutation } from '@features/MyPage/api/userFeedsApi';

interface BookDetail extends Omit<Book, 'bookTitle'> {
  title: string;
}

interface ReviewMorePageTemplateProps {
  totalReviews: number;
  reviews: OneLineReview[];
  hasMore: boolean;
  fetchMoreData: () => void;
  bookDetails?: BookDetail;
}

const ReviewMorePageTemplate: React.FC<ReviewMorePageTemplateProps> = ({
  totalReviews,
  reviews,
  hasMore,
  fetchMoreData,
  bookDetails,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('likes');
  // const [sortedReviews, setSortedReviews] = useState<OneLineReview[]>(reviews);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  const dispatch = useDispatch();
  const [deletePosts] = useDeletePostsMutation();

  // useEffect(() => {
  //   const updatedReviews = [...reviews];
  //   if (sortOption === 'likes') {
  //     updatedReviews.sort((a, b) => b.likes - a.likes);
  //   } else if (sortOption === 'ratingHigh') {
  //     updatedReviews.sort((a, b) => b.rating - a.rating);
  //   } else if (sortOption === 'ratingLow') {
  //     updatedReviews.sort((a, b) => a.rating - b.rating);
  //   } else if (sortOption === 'latest') {
  //     updatedReviews.sort(
  //       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  //     );
  //   }
  //   setSortedReviews(updatedReviews);
  // }, [reviews, sortOption]);

  console.log(reviews);

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

  const handleReviewSelect = (postId: string) => {
    setSelectedReviews(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // 이미 선택된 경우 제거
          : [...prev, postId], // 선택되지 않은 경우 추가
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await deletePosts(selectedReviews); // 선택된 게시물 삭제

      // Redux 상태에서 삭제된 게시물 제거
      dispatch(deleteReviews(selectedReviews));

      setIsDeleteMode(false);
      setSelectedReviews([]);
    } catch (error) {
      console.error('Failed to delete posts:', error);
    }
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
          한 줄 리뷰 {totalReviews}
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
        items={reviews}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 6 }}
        renderItem={(review) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            {isDeleteMode && (
              <Checkbox
                checked={selectedReviews.includes(review.post_id)}
                onChange={() => handleReviewSelect(review.post_id)}
                sx={{ padding: '4px', marginRight: '8px' }}
              />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <ReviewCard
                postId={review.post_id}
                username={review.user.username}
                date={formatDate(review.created_at)}
                content={review.review}
                rating={review.rating ?? 0}
                isbn={review.book.isbn}
              />
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
