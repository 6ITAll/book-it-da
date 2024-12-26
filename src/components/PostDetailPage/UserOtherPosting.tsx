import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import { mockUserOtherPosting } from './mockUserOtherPosting';
import Carousel from '@components/commons/Carousel';

const UserOtherPosts = () => {
  const carouselSettings = {
    slidesToShow: 3,
    dots: true,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: false,
          infinite: true,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', my: 5, px: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        사용자의 다른 포스팅
      </Typography>
      <Carousel settings={carouselSettings}>
        {/* 포스트 카드 공통 컴포넌트로 교체 */}
        {mockUserOtherPosting.map((post) => (
          <Box key={post.id} sx={{ px: 1 }}>
            <Card
              sx={{
                height: '200px',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: 3,
                },
                padding: '1rem',
                backgroundColor: '#fafafa',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      height: '120px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      '& img': {
                        height: '100%',
                        objectFit: 'contain',
                      },
                    }}
                  >
                    <img src={post.book.imageUrl} alt={post.book.title} />
                  </Box>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.book.title} - {post.book.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.content}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default UserOtherPosts;
