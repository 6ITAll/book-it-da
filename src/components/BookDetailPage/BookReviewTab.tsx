import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
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
      {/* ===== 한 줄 리뷰 섹션 ===== */}
      <Box sx={{ marginBottom: '2rem' }}>
        {/* 헤더 */}
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
        {/* 별점 입력 */}
        {/* 별점 입력 */}
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
        {/* 리뷰 카드 */}
        <Grid container spacing={2}>
          {reviews.map((review, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 'none',
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{review.username.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {review.username}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                    {review.content}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<FavoriteBorderIcon />}
                    sx={{
                      marginTop: '0.5rem',
                      color: '#555',
                    }}
                  >
                    좋아요 {review.likes}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* ===== 포스트 섹션 ===== */}
      <Box>
        {/* 헤더 */}
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

        {/* 포스트 카드 */}
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card
                sx={{
                  borderRadius: '12px',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e7e8e9',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  {/* 제목 */}
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ marginBottom: '1rem' }}
                  >
                    {post.title}
                  </Typography>

                  {/* 컨텐츠 */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                      overflow: 'hidden',
                    }}
                  >
                    {post.content}
                  </Typography>
                </CardContent>

                {/* 유저 정보와 팔로우 버튼 */}
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ borderTop: '1px solid #e6e7e8', paddingTop: '1rem' }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {/* 유저 아바타 */}
                      <Avatar
                        src={post.avatar}
                        alt={post.author}
                        sx={{ width: 40, height: 40 }}
                      />
                      {/* 유저 이름 */}
                      <Typography variant="body2" fontWeight="bold">
                        {post.author}
                      </Typography>
                    </Stack>
                    {/* 팔로우 버튼 */}
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        borderRadius: '16px',
                        '&:hover': {
                          backgroundColor: '#555',
                        },
                      }}
                    >
                      팔로우
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookReviewsTab;
