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
  type: string;
}

const OneLineReviewSection = ({
  username,
  oneLineReviews,
  oneLineReviewCount,
  type,
}: OneLineReviewSectionProps): JSX.Element => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (type === '내 피드') {
      navigate(`/my-page/${username}/feeds/reviews`);
    } else if (type === '좋아요한 피드') {
      navigate(`/my-page/${username}/liked/reviews`);
    }
  };
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
          onClick={handleNavigate}
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
              postId={oneLineReview.postId}
              rating={oneLineReview.rating ?? 0}
              username={oneLineReview.user.username}
              avatarUrl={oneLineReview.user.avatarUrl ?? ''}
              date={formatDate(oneLineReview.createdAt)}
              content={oneLineReview.review}
              isbn={oneLineReview.book.isbn}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OneLineReviewSection;
