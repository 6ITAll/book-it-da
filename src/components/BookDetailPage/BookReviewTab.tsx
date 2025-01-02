import { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ReviewCard from '@components/commons/DetailPageReviewCard';
import PostCard from '@components/commons/DetailPagePostCard';
import { useNavigate } from 'react-router-dom';
import OneLineReviewDialog from '@components/FeedPage/OneLineReviewDialog/OneLineReviewDialog';
import StarRating from '@components/commons/StarRating';
import { useGetPostsQuery } from '@features/BookDetailPage/api/PostApi';
import { useGetReviewsQuery } from '@features/BookDetailPage/api/reviewApi';

interface BookReviewTabProps {
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

type MoreType = 'posts' | 'reviews';

const BookReviewsTab = ({
  itemId,
  title,
  author,
  imageUrl,
}: BookReviewTabProps): JSX.Element => {
  const [rating, setRating] = useState<number>(0); // 선택된 별점 상태
  const navigate = useNavigate();
  const [isOneLineReviewModalOpen, setIsOneLineReviewModalOpen] =
    useState<boolean>(false); // 모달 열림 상태

  // API 데이터 가져오기
  const { data: postData = [] } = useGetPostsQuery(itemId);
  const { data: reviewData = [] } = useGetReviewsQuery(itemId);

  // 포스트, 리뷰 총 개수 계산
  const postTotal = postData.length;
  const reviewTotal = reviewData.length;

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsOneLineReviewModalOpen(false);
  };

  // 포스트, 리뷰 상세 페이지로 이동
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
    <Box sx={{ padding: '1rem 1rem' }}>
      {/* 리뷰 섹션 */}
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
            한 줄 리뷰 {reviewTotal}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('reviews')}
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            더보기
          </Button>
        </Box>
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
          <Stack direction="row" spacing={1}>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              isDialog={false}
              openDialog={setIsOneLineReviewModalOpen} // 모달 열기 설정
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
        <Grid container spacing={2}>
          {reviewData?.map((review, index) => (
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
                rating={review.rating}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 포스트 섹션 */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            이 책의 포스트 {postTotal}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => handleSeeMoreClick('posts')}
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            더보기
          </Button>
        </Box>
        <Grid container spacing={2}>
          {postData?.map((post, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <PostCard
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
