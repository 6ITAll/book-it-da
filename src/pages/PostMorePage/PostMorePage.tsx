import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PostCard from '@components/commons/DetailPagePostCard';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';

// Mock 데이터 생성
const generateMockPosts = () => {
  const mockData = [];
  for (let i = 1; i <= 50; i++) {
    mockData.push({
      title: `트렌드 코리아 ${i}`,
      content: `트렌드 코리아 ${i}의 내용을 간략하게 소개합니다. 트렌드는 언제나 새롭고 흥미로운 주제를 다룹니다.`,
      author: `Author${i}`,
      avatar: `https://via.placeholder.com/40?text=A${i}`,
    });
  }
  return mockData;
};

const allMockPosts = generateMockPosts();

const PostMorePage = (): JSX.Element => {
  const [posts, setPosts] = useState(allMockPosts.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = () => {
    setTimeout(() => {
      const currentLength = posts.length;
      if (currentLength >= allMockPosts.length) {
        setHasMore(false);
        return;
      }
      const nextPosts = allMockPosts.slice(currentLength, currentLength + 10);
      setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    }, 1000);
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '1rem' }}>
        총 포스트 {allMockPosts.length}
      </Typography>
      <InfiniteScrollComponent
        items={posts}
        hasMore={hasMore}
        fetchMore={fetchMorePosts}
        gridSize={{ xs: 12, md: 6 }}
        renderItem={(post) => <PostCard {...post} />}
      />
    </Box>
  );
};

export default PostMorePage;
