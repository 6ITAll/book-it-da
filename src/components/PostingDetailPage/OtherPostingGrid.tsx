import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OtherPostingCard from './OtherPostingCard';
import { OtherPost } from '@features/PostDetailPage/types/types';
import { postingDetailStyles } from '@components/PostingDetailPage/PostingDetail.styles';

interface OtherPostingGridProps {
  title: string;
  posts: OtherPost[];
}

const OtherPostingGrid = ({ title, posts }: OtherPostingGridProps) => (
  <Box sx={postingDetailStyles.otherPostingBox}>
    <Typography variant="h6" sx={postingDetailStyles.otherPostingTitle}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid key={index} size={{ xs: 12, md: 4 }}>
          <OtherPostingCard post={post} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default OtherPostingGrid;
