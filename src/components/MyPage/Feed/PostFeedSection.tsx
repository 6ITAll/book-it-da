import { Post } from '@components/BookDetailPage/BookReviewTab';
import PostCard from '@components/commons/DetailPagePostCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface PostFeedSectionProps {
  posts: Post[];
}

const PostFeedSection = ({ posts }: PostFeedSectionProps): JSX.Element => {
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
              content={post.content}
              author={post.author}
              avatar={post.avatar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostFeedSection;
