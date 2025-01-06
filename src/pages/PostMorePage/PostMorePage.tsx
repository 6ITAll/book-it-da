import { Box, Typography } from '@mui/material';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import PostCard from '@components/commons/DetailPagePostCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPaginatedPostsQuery } from '@features/BookDetailPage/api/postApi';
import { Post } from '@shared/types/type';

const PostMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { itemId } = bookDetails || {};

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError } = useGetPaginatedPostsQuery({
    itemId,
    page,
  });

  useEffect(() => {
    if (data?.posts) {
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      if (data.posts.length < 10) setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && !isError) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '1rem' }}>
        {`포스트 목록 (${data?.totalPosts || 0}개)`}
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

export default PostMorePage;
