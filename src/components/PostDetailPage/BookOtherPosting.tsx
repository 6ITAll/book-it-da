import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
} from '@mui/material';
import { mockBookOtherPosting } from './mockBookOtherPosting';
import Carousel from '@components/commons/Carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BookOtherPosts = () => {
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
        이 책의 다른 포스팅
      </Typography>
      <Carousel settings={carouselSettings}>
        {mockBookOtherPosting.map((post) => (
          <Box key={post.id} sx={{ px: 1 }}>
            <Card
              sx={{
                height: '200px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'scale(1.05)',
                },
                padding: '1rem',
                backgroundColor: '#fafafa',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={post.user.avatarUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {post.user.name}
                    </Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '40px',
                      }}
                    >
                      {post.content}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <FavoriteIcon
                        sx={{
                          fontSize: 16,
                          color: 'error.main',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.likeCount}
                      </Typography>
                    </Stack>
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

export default BookOtherPosts;
