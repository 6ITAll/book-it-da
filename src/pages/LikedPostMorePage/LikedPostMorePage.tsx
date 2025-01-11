import { useState, useEffect } from 'react';
import { Post } from '@shared/types/type';
import PostMoreTemplate from '@components/PostMorePage/PostMoreTemplate';
import { useGetLikedPaginatedFeedsQuery } from '@features/MyPage/api/userFeedsApi';

const LikedPostMorePage = (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError } = useGetLikedPaginatedFeedsQuery({
    userId: 'user',
    feedType: 'post',
    page,
  });

  useEffect(() => {
    if (data?.feeds) {
      setPosts((prevPosts) => [...prevPosts, ...data.feeds]);
      if (data.feeds.length < 10) setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && !isError) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <PostMoreTemplate
      totalPosts={data?.totalFeeds}
      posts={posts}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default LikedPostMorePage;
