import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  generateRandomDescription,
  generateRandomFeedType,
  generateRandomTitle,
  mockPosts,
  getRandomBook,
} from '@components/FeedPage/mockPosts';

import PostCard from '@components/commons/PostCard';
import ScrollToTop from '@components/commons/ScrollToTop';
import { FeedTypeFilter } from '@components/FeedPage/FeedTypeFilter';
import { PostTypeFilter } from '@components/FeedPage/PostTypeFilter';
import { Post, PostType, FeedType } from '@shared/types/type';
import {
  generateRandomPostType,
  generateRandomTimeAgo,
} from '@components/FeedPage/mockPosts';

const Main = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [hasMore, setHasMore] = useState(true);
  const [postType, setPostType] = useState<PostType | ''>('');
  const [feedType, setFeedType] = useState<FeedType>('추천');
  const [filterKey, setFilterKey] = useState(0);
  // 카드 표시 모드 설정
  const isDetail: boolean = true;

  // 포스트 타입 (한줄평 | 포스팅) 필터링 설정 > 추후 interface 확립 후 변경
  const handlePostTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: PostType | '',
  ) => {
    setPostType(newValue);
    setHasMore(true);
    setFilterKey((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  // 피드 타입 (추천 | 팔로워 | 팔로잉) 필터링 > 추후 interface 확립 후 변경
  const handleFeedTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: FeedType | null,
  ) => {
    setFeedType(newValue || '추천');
    setHasMore(true);
    setFilterKey((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  // mock post 생성 > 추후 API 요청으로 변경
  const getFilteredPosts = (count: number, startId: number): Post[] => {
    return Array.from({ length: count }, (_, i) => {
      const book = getRandomBook(); // 각 포스트마다 새로운 책을 랜덤하게 선택

      return {
        id: startId + i,
        title: generateRandomTitle(),
        description: generateRandomDescription(),
        imageUrl: book.imageUrl,
        userName: `user${startId + i}`,
        timeAgo: generateRandomTimeAgo(),
        postType: (postType || generateRandomPostType()) as PostType,
        feedType: (feedType || generateRandomFeedType()) as FeedType,
        bookTitle: book.bookTitle,
        bookAuthor: book.author,
      };
    }).filter((post) => {
      const postTypeMatch = !postType || post.postType === postType;
      const feedTypeMatch =
        !feedType ||
        (feedType === '추천'
          ? post.feedType === '추천'
          : feedType === post.feedType);
      return postTypeMatch && feedTypeMatch;
    });
  };

  // Infinite Scroll 시 데이터 요청 > 추후 API 요청으로 변경
  const fetchMoreData = () => {
    if (posts.length >= 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newPosts: Post[] = getFilteredPosts(10, posts.length + 1);

      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => [...prev, ...newPosts]);
    }, 1000);
  };

  // 필터링 타입 변경 시 리렌더링 (초기 10개의 Mock Post 요청)
  useEffect(() => {
    const initialPosts: Post[] = getFilteredPosts(10, 1);
    setPosts(initialPosts);
  }, [postType, feedType]);

  return (
    <Container
      sx={{
        width: '100%',
        padding: '1rem',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <FeedTypeFilter
          feedType={feedType}
          onFeedTypeChange={handleFeedTypeChange}
        />
        <PostTypeFilter
          postType={postType}
          onPostTypeChange={handlePostTypeChange}
        />
      </Box>

      <InfiniteScroll
        key={filterKey}
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <CircularProgress color="primary" value={25} />
          </Box>
        }
        endMessage={
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
            }}
          >
            <Typography>더이상 표시할 것이 없습니다.</Typography>
          </Box>
        }
        style={{
          padding: '10px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'hidden',
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 4 }}
          spacing={4}
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          }}
        >
          {posts.map((post) => (
            <Box key={post.id}>
              <PostCard
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                userName={post.userName}
                timeAgo={post.timeAgo}
                postType={post.postType}
                feedType={post.feedType}
                bookTitle={post.bookTitle}
                bookAuthor={post.bookAuthor}
                isDetail={isDetail}
              />
            </Box>
          ))}
        </Masonry>
      </InfiniteScroll>
      <ScrollToTop />
    </Container>
  );
};

export default Main;
