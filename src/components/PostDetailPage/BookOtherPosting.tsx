import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Button,
} from '@mui/material';
import { mockBookOtherPosting } from './mockBookOtherPosting';
import Grid from '@mui/material/Grid2';

const BookOtherPosts = () => {
  return (
    <Box sx={{ width: '100%', my: 5, px: 4, boxSizing: 'border-box' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        이 책의 다른 포스팅
      </Typography>
      <Grid container spacing={2}>
        {mockBookOtherPosting.map((post, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex', flexDirection: 'column' }}
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
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ marginBottom: '1rem' }}
                >
                  {post.title}
                </Typography>
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
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ borderTop: '1px solid #e7e8e9', paddingTop: '1rem' }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={post.user.avatarUrl}
                      alt={post.user.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {post.user.name}
                    </Typography>
                  </Stack>
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
  );
};

export default BookOtherPosts;
