import { Box, Typography, Stack, Skeleton } from '@mui/material';
import StarRating from '@components/commons/StarRating';
import ReviewCard from '@components/commons/ReviewCard';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useGetBookOwnReviewQuery } from '@features/BookDetailPage/api/bookOwnReviewApi';
import { bookReviewTabStyles } from './BookDetail.styles';
import { UserInfo } from '@features/user/userSlice';
import { Dispatch, SetStateAction } from 'react';
import { formatDate } from '@shared/utils/dateUtils';

interface BookMyReviewProps {
  isbn: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  openDialog: Dispatch<SetStateAction<boolean>>;
}

const BookMyReview = ({
  isbn,
  rating,
  onRatingChange,
  openDialog,
}: BookMyReviewProps): JSX.Element => {
  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );

  const {
    data: userReview,
    isLoading,
    error,
  } = useGetBookOwnReviewQuery(
    { userId: currentUserId, isbn },
    {
      skip: !currentUserId || !isbn,
    },
  );

  console.log(userReview);

  if (isLoading) {
    return (
      <Box
        sx={{
          ...bookReviewTabStyles.reviewBox,
          padding: 1,
          mb: '2rem',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={bookReviewTabStyles.reviewBox}>
        <Typography color="error">리뷰를 불러오는데 실패했습니다.</Typography>
      </Box>
    );
  }

  if (!userReview) {
    return (
      <Box sx={bookReviewTabStyles.reviewBox}>
        <Stack direction="row" spacing={1}>
          <StarRating
            rating={rating}
            onRatingChange={onRatingChange}
            isDialog={false}
            openDialog={openDialog}
          />
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: '0.5rem' }}
        >
          이 책은 어떠셨나요? 별점을 남겨주세요
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={bookReviewTabStyles.myReviewBox}>
      <ReviewCard
        postId={userReview.postId}
        username={userReview.user.username}
        avatarUrl={userReview.user.avatarUrl}
        date={formatDate(userReview.createdAt)}
        content={userReview.review}
        rating={userReview.rating || 0}
        isbn={isbn}
      />
    </Box>
  );
};

export default BookMyReview;
