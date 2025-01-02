import ReviewCard from '@components/commons/DetailPageReviewCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Review } from '@shared/types/type';

interface ReviewFeedSectionProps {
  reviews: Review[];
}

const ReviewFeedSection = ({
  reviews,
}: ReviewFeedSectionProps): JSX.Element => {
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
          sx={{ color: '#333', fontWeight: 'bold' }}
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
              username={review.username}
              date={review.date}
              content={review.content}
              likes={review.likes}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewFeedSection;
