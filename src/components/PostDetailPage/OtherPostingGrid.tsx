import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OtherPostingCard from './OtherPostingCard';
import { OtherPost } from '@features/PostDetailPage/types/types';

interface OtherPostingGridProps {
  title: string;
  posts: OtherPost[];
}

const OtherPostingGrid = ({ title, posts }: OtherPostingGridProps) => (
  <Box sx={{ width: '100%', my: 5, px: 4, boxSizing: 'border-box' }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {posts.map((post, index) => (
        <Grid
          key={index}
          size={{ xs: 12, md: 4 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <OtherPostingCard post={post} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default OtherPostingGrid;
