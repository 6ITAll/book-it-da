import { Box, Typography, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ReviewCard from '@components/commons/ReviewCard';
import PostCard from '@components/commons/PostCard';
import { useNavigate } from 'react-router-dom';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import { MoreType } from '@components/BookDetailPage/types';
import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
import { useState } from 'react';
import BookMyReview from './BookMyReview';
import {
  useGetBookPostCountQuery,
  useGetLatestBookPostingsQuery,
  useGetLatestBookReviewsQuery,
} from '@features/BookDetailPage/api/bookFeedPreviewApi';
import { formatDate } from '@shared/utils/dateUtils';
interface BookFeedTabProps {
  isbn: string;
  title: string;
  author: string;
  imageUrl: string;
}

const BookFeedTab = ({
  isbn,
  title,
  author,
  imageUrl,
}: BookFeedTabProps): JSX.Element => {
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();
  const [isOneLineReviewModalOpen, setIsOneLineReviewModalOpen] =
    useState<boolean>(false);
  const theme = useTheme();

  const { data: latestPostings } = useGetLatestBookPostingsQuery({ isbn });
  const { data: latestReviews } = useGetLatestBookReviewsQuery({ isbn });
  const { data: bookPostCount } = useGetBookPostCountQuery({ isbn });

  const handleModalClose = () => {
    setIsOneLineReviewModalOpen(false);
  };

  const handleSeeMoreClick = (type: MoreType) => {
    if (isbn) {
      navigate(`/bookDetail/${isbn}/${type}`);
    }
  };

  return (
    <Box sx={bookReviewTabStyles.container}>
      {/* 리뷰 섹션 */}
      <Box sx={bookReviewTabStyles.reviewSection}>
        <Box sx={bookReviewTabStyles.sectionHeader}>
          <Typography variant="h6" fontWeight="bold">
            나의 한줄평
          </Typography>
        </Box>
        <BookMyReview
          isbn={isbn}
          rating={rating}
          onRatingChange={setRating}
          openDialog={setIsOneLineReviewModalOpen}
        />
        <Box sx={bookReviewTabStyles.sectionHeader}>
          <Typography variant="h6" fontWeight="bold">
            한줄평 ({bookPostCount?.review_count})
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('reviews')}
            sx={bookReviewTabStyles.moreButton}
          >
            더보기
          </Button>
        </Box>
        {latestReviews ? (
          <Grid container spacing={2}>
            {latestReviews.map((review, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 4 }}
                sx={bookReviewTabStyles.gridContainer}
              >
                <ReviewCard
                  postId={review.postId}
                  username={review.user.username}
                  avatarUrl={review.user.avatarUrl}
                  date={formatDate(review.createdAt)}
                  content={review.review}
                  rating={review.rating ?? 0}
                  isbn={isbn}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: '3rem',
              textAlign: 'center',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              리뷰가 없습니다.
            </Typography>
          </Box>
        )}
      </Box>
      {/* 포스트 섹션 */}
      <Box>
        <Box sx={bookReviewTabStyles.sectionHeader}>
          <Typography variant="h6" fontWeight="bold">
            포스팅 ({bookPostCount?.posting_count})
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('postings')}
            sx={bookReviewTabStyles.moreButton}
          >
            더보기
          </Button>
        </Box>
        {latestPostings ? (
          <Grid container spacing={2}>
            {latestPostings.map((posting, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 4 }}
                sx={bookReviewTabStyles.gridContainer}
              >
                <PostCard
                  postId={posting.postId}
                  title={posting.title}
                  content={posting.content}
                  isbn={isbn}
                  user={posting.user}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: '3rem',
              textAlign: 'center',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              포스팅 글이 없습니다.
            </Typography>
          </Box>
        )}
      </Box>
      {/* 한줄평 작성 모달 */}
      <OneLineReviewDialog
        isOpen={isOneLineReviewModalOpen}
        onClose={handleModalClose}
        receivedBook={{
          title,
          imageUrl,
          author,
          isbn,
        }}
        receivedRating={rating}
      />
    </Box>
  );
};

export default BookFeedTab;
