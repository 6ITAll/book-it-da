import { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ReviewCard from '@components/commons/ReviewCard';
import PostCard from '@components/commons/PostCard';
import { useNavigate } from 'react-router-dom';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import StarRating from '@components/commons/StarRating';
import { useGetPostsQuery } from '@features/BookDetailPage/api/postApi';
import { useGetReviewsQuery } from '@features/BookDetailPage/api/reviewApi';
import { MoreType } from '@components/BookDetailPage/types';
import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';

interface BookReviewTabProps {
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

const BookReviewsTab = ({
  itemId,
  title,
  author,
  imageUrl,
}: BookReviewTabProps): JSX.Element => {
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();
  const [isOneLineReviewModalOpen, setIsOneLineReviewModalOpen] =
    useState<boolean>(false);

  const { data: postData = { totalPosts: 0, topPosts: [] } } =
    useGetPostsQuery(itemId);
  const { data: reviewData = { totalReviews: 0, topReviews: [] } } =
    useGetReviewsQuery(itemId);

  // 좋아요 높은 순 3개 리뷰
  const reviews = reviewData?.topReviews || [];
  const totalReviews = reviewData?.totalReviews || 0;

  // 상위 3개 포스트
  const totalPosts = postData?.totalPosts || 0;
  const topPosts = postData?.topPosts || [];

  const handleModalClose = () => {
    setIsOneLineReviewModalOpen(false);
  };

  const handleSeeMoreClick = (type: MoreType) => {
    if (itemId) {
      navigate(`/bookDetail/${itemId}/${type}`, {
        state: {
          bookDetails: {
            title,
            imageUrl,
            author,
            itemId,
          },
        },
      });
    }
  };

  return (
    <Box sx={bookReviewTabStyles.container}>
      {/* 리뷰 섹션 */}
      <Box sx={bookReviewTabStyles.reviewSection}>
        <Box sx={bookReviewTabStyles.sectionHeader}>
          <Typography variant="h6" fontWeight="bold">
            한 줄 리뷰 {totalReviews}
          </Typography>
        </Box>
        <Box sx={bookReviewTabStyles.reviewBox}>
          <Stack direction="row" spacing={1}>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              isDialog={false}
              openDialog={setIsOneLineReviewModalOpen}
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
        <Box display="flex" justifyContent="flex-end">
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('reviews')}
            sx={bookReviewTabStyles.moreButton}
          >
            더보기
          </Button>
        </Box>
        <Grid container spacing={2}>
          {reviews?.map((review, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              sx={bookReviewTabStyles.gridContainer}
            >
              <ReviewCard
                username={review.username}
                userId={review.userId || ''}
                date={review.date}
                content={review.content}
                likes={review.likes}
                rating={review.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* 포스트 섹션 */}
      <Box>
        <Box sx={bookReviewTabStyles.sectionHeader}>
          <Typography variant="h6" fontWeight="bold">
            이 책의 포스트 {totalPosts}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('posts')}
            sx={bookReviewTabStyles.moreButton}
          >
            더보기
          </Button>
        </Box>
        <Grid container spacing={2}>
          {topPosts?.map((post, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              sx={bookReviewTabStyles.gridContainer}
            >
              <PostCard
                userId={post.userId}
                title={post.title}
                description={post.description}
                userName={post.userName}
                avatar={post.avatar}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* 한줄평 작성 모달 */}
      <OneLineReviewDialog
        isOpen={isOneLineReviewModalOpen}
        onClose={handleModalClose}
        receivedBook={{
          bookTitle: title!,
          imageUrl: imageUrl!,
          author: author!,
          itemId: itemId!,
        }}
        receivedRating={rating}
      />
    </Box>
  );
};

export default BookReviewsTab;
