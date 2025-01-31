import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { OneLineReview } from '../types';
import { formatDate } from '@shared/utils/dateUtils';
import ReviewCard from '@components/commons/ReviewCard';

interface OneLineReviewSectionProps {
  username: string;
  oneLineReviews: OneLineReview[];
  oneLineReviewCount: number;
}

const OneLineReviewSection = ({
  username,
  oneLineReviews,
  oneLineReviewCount,
}: OneLineReviewSectionProps): JSX.Element => {
  const navigate = useNavigate();
  console.log(oneLineReviews);
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
          한줄평 ({oneLineReviewCount})
        </Typography>
        <Button
          size="small"
          variant="text"
          sx={bookReviewTabStyles.moreButton}
          onClick={() => {
            navigate(`/my-page/${username}/feeds/reviews`);
          }}
        >
          더보기
        </Button>
      </Box>
      <Grid container spacing={2}>
        {oneLineReviews.map((oneLineReview, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ReviewCard
              rating={oneLineReview.rating ?? 0}
              username={oneLineReview.user.username}
              date={formatDate(oneLineReview.created_at)}
              content={oneLineReview.review}
              likes={oneLineReview.like_count}
              isbn={oneLineReview.book.isbn}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OneLineReviewSection;
