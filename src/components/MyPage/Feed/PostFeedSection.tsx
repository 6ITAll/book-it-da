import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
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
  const mockUser = { id: '1' };

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
          sx={bookReviewTabStyles.moreButton}
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
              postId="postId"
              title={post.title}
              content="내용"
              cover="커버"
              user={mockUser}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostFeedSection;
