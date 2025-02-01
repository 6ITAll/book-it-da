import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
import PostCard from '@components/commons/PostCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { Posting } from '../types';

interface PostingFeedSectionProps {
  username: string;
  postings: Posting[];
  postingCount: number;
}

const PostingFeedSection = ({
  username,
  postings,
  postingCount,
}: PostingFeedSectionProps): JSX.Element => {
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
          포스팅 ({postingCount})
        </Typography>
        <Button
          size="small"
          variant="text"
          sx={bookReviewTabStyles.moreButton}
          onClick={() => {
            navigate(`/my-page/${username}/feeds/postings`);
          }}
        >
          더보기
        </Button>
      </Box>
      <Grid container spacing={2}>
        {postings.map((posting, index) => (
          <Grid
            key={index}
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <PostCard
              postId={posting.post_id}
              title={posting.title}
              content={posting.content}
              isbn={posting.book.isbn}
              user={posting.user}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostingFeedSection;
