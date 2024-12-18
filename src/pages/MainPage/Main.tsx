import { useState } from 'react';
import { CircularProgress, Container } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Post } from '@/shared/types/type';

const Main = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Mock Posts 생성 > 추후 API 요청으로 수정
  const fetchMoreData = () => {};

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div
            style={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid red',
              padding: '1rem 0',
            }}
          >
            <CircularProgress color="primary" value={25} />
          </div>
        }
        endMessage={
          <div
            style={{
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid red',
              padding: '1rem 0',
            }}
          >
            <p>더이상 표시할 것이 없습니다.</p>
          </div>
        }
        style={{ paddingBottom: '16px' }}
      >
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="16px">
            {posts.map((post) => (
              <div>카드</div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </Container>
  );
};

export default Main;
