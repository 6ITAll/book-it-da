import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
import ReviewCard from '@components/commons/ReviewCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Review } from '@shared/types/type';
import { useNavigate } from 'react-router-dom';

interface ReviewFeedSectionProps {
  userId: string;
  reviews: Review[];
}

const ReviewFeedSection = ({
  userId,
  reviews,
}: ReviewFeedSectionProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          한 줄 리뷰 {reviews.length}
        </Typography>
        <Button
          size="small"
          variant="text"
          sx={bookReviewTabStyles.moreButton}
          onClick={() => {
            navigate(`/my-page/${userId}/feeds/reviews`);
          }}
        >
          더보기
        </Button>
      </Box>
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ReviewCard
              rating={review.rating}
              username={review.username}
              date={review.date}
              content={review.content}
              likes={review.likes}
              userId={review.userId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewFeedSection;
