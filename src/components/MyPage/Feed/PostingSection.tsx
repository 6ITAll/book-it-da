import { bookReviewTabStyles } from '@components/BookDetailPage/BookDetail.styles';
import PostCard from '@components/commons/PostCard';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { Posting } from '../types';
import { navigateToUserPostMorePage } from '@shared/utils/navigation';

interface PostingFeedSectionProps {
  username: string;
  postings: Posting[];
  postingCount: number;
  type: string;
}

const PostingFeedSection = ({
  username,
  postings,
  postingCount,
  type,
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
          onClick={() =>
            navigateToUserPostMorePage(navigate, username, type, 'postings')
          }
        >
          더보기
        </Button>
      </Box>
      {postings.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          {type === '내 피드'
            ? '작성한 포스팅이 없습니다.'
            : '포스팅에 좋아요를 누른 항목이 없습니다.'}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {postings.map((posting, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <PostCard
                postId={posting.postId}
                title={posting.title}
                content={posting.content}
                isbn={posting.book.isbn}
                user={posting.user}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PostingFeedSection;
