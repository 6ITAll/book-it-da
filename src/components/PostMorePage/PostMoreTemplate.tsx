import PostCard from '@components/commons/PostCard';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import { Box, Typography } from '@mui/material';
import { Post } from '@shared/types/type';

interface PostMoreTemplateProps {
  totalPosts?: number;
  posts: Post[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

const PostMoreTemplate = ({
  totalPosts,
  posts,
  hasMore,
  fetchMoreData,
}: PostMoreTemplateProps) => {
  return (
    <Box sx={{ padding: '1rem', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '1rem' }}>
        {`포스트 목록 (${totalPosts || 0}개)`}
      </Typography>

      <InfiniteScrollComponent
        items={posts}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        gridSize={{ xs: 12, md: 6 }}
        renderItem={(post) => <PostCard {...post} />}
      />
    </Box>
  );
};

export default PostMoreTemplate;
