import { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid2';
import ReviewCard from '@components/commons/DetailPageReviewCard';
import PostCard from '@components/commons/DetailPagePostCard';
// 리뷰 데이터 타입
interface Review {
  username: string;
  date: string;
  content: string;
  likes: number;
}

// 포스트 데이터 타입
interface Post {
  title: string;
  content: string;
  author: string;
  avatar: string; // 유저 아바타
}

// 더미 데이터: 리뷰
const reviews: Review[] = [
  {
    username: 'Lovely ChaeChae',
    date: '2024.08.01',
    content: '새롭네요!',
    likes: 1,
  },
  {
    username: '독서왕난이',
    date: '2024.02.27',
    content: '도슨트북 새롭고 재미있어요',
    likes: 1,
  },
  {
    username: '다비다나고양이',
    date: '2024.10.16',
    content: '책에 더 흥미를 갖게 도와주는 것 같아요',
    likes: 1,
  },
];

// 더미 데이터: 포스트
const posts: Post[] = [
  {
    title: '2월은 결심하기 좋은 자기계발의 달!',
    content:
      '2024년에도 어김없이 결심의 시즌이 돌아왔습니다! 여러분을 위한 특별한 추천 도서를 소개합니다.',
    author: 'MILLIE 밀리',
    avatar: '/path/to/avatar1.jpg',
  },
  {
    title: '✨ 2024 상반기 결산 - 책복/도슨트북',
    content:
      '밀리에서 전자책 외에다양한 독서 콘텐츠를 빼놓을 수 없죠! 😉밀리는 회원들의 일상생활에 독서가 1밀리 더스며들 수 있도록 다양한 도전을 이어가고 있어요. 챗북부터 도슨트북, 오브제북, 영상 콘텐츠까지!2024년 상반기에도 책을 쉽고, 재밌고, 풍성하게접할 수 있는 새로운 콘텐츠들이 쏟아졌는데요.과연 그중 어떤 콘텐츠가 주목받았는지함께 확인해 볼까요? 2024년의 상반기, 밀리 회원들이 좋아한 콘텐츠 랭킹을 보면 인간관계에 대한 관심이 높아진 것',
    author: '밀리 독서연구소',
    avatar: '/path/to/avatar2.jpg',
  },
  {
    title: '좋아하는 것들',
    content: '나만의 취향을 담은 독서 추천, 여러분과 함께 하고 싶어요.',
    author: '16층 노예',
    avatar: '/path/to/avatar3.jpg',
  },
];

const BookReviewsTab = (): JSX.Element => {
  const [rating, setRating] = useState<number>(0); // 선택된 별점 상태

  const handleStarClick = (index: number) => {
    setRating(index + 1); // 클릭한 별까지 선택
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
            {Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                onClick={() => handleStarClick(index)}
                sx={{
                  cursor: 'pointer',
                  color: index < rating ? 'gold' : '#ccc',
                }}
              >
                {index < rating ? (
                  <StarIcon fontSize="large" />
                ) : (
                  <StarOutlineIcon fontSize="large" />
                )}
              </Box>
            ))}
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
            이 책의 포스트 {posts.length}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <PostCard
                title={post.title}
                content={post.content}
                author={post.author}
                avatar={post.avatar}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookReviewsTab;
