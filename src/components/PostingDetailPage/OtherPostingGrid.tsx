import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OtherPostingCard from './OtherPostingCard';
import { postingDetailStyles } from './PostingDetail.styles';
import {
  useGetBookOtherPostsQuery,
  useGetUserOtherPostsQuery,
} from '@features/PostDetailPage/api/postingApi';

type OtherPostingType = 'BookOtherPosting' | 'UserOtherPosting';

interface OtherPostingGridProps {
  type: OtherPostingType;
  isbn?: string;
  userId?: string;
  postingId: string;
}

const OtherPostingGrid: React.FC<OtherPostingGridProps> = ({
  type,
  isbn,
  userId,
  postingId,
}) => {
  const title =
    type === 'BookOtherPosting'
      ? '이 책의 다른 포스팅'
      : '사용자의 다른 포스팅';

  const { data: bookOtherPosts, isLoading: isBookLoading } =
    useGetBookOtherPostsQuery(
      { isbn: isbn || '', currentPostingId: postingId },
      {
        skip: type !== 'BookOtherPosting' || !isbn || !postingId,
      },
    );
  const { data: userOtherPosts, isLoading: isUserLoading } =
    useGetUserOtherPostsQuery(
      { userId: userId || '', currentPostingId: postingId },
      {
        skip: type !== 'UserOtherPosting' || !userId || !postingId,
      },
    );

  const posts = type === 'BookOtherPosting' ? bookOtherPosts : userOtherPosts;
  const isLoading = type === 'BookOtherPosting' ? isBookLoading : isUserLoading;

  if (isLoading) return <div>로딩 중...</div>;
  if (!posts || posts.length === 0) return null;

  return (
    <Box sx={postingDetailStyles.otherPostingBox}>
      <Typography variant="h6" sx={postingDetailStyles.otherPostingTitle}>
        {title}
      </Typography>
      <Grid container direction="column" spacing={3}>
        {posts.map((post, index) => (
          <Grid key={index} size={{ xs: 12 }}>
            <OtherPostingCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OtherPostingGrid;
