import PostCard from '@components/commons/PostCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BookDetailPost } from '@shared/types/type';
import { useNavigate } from 'react-router-dom';

interface PostFeedSectionProps {
  userId: string;
  posts: BookDetailPost[];
}

const PostFeedSection = ({
  userId,
  posts,
}: PostFeedSectionProps): JSX.Element => {
  const navigate = useNavigate();

  return (
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
        <Button
          size="small"
          variant="text"
          sx={{ color: '#333', fontWeight: 'bold' }}
          onClick={() => {
            navigate(`/my-page/${userId}/feeds/posts`);
          }}
        >
          더보기
        </Button>
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
              description={post.description}
              userName={post.userName}
              avatar={post.avatar}
              userId={post.userId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostFeedSection;
