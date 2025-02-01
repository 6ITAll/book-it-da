import { useState, useEffect } from 'react';
import { BookDetailPost } from '@shared/types/type';
import PostingMoreTemplate from '@components/PostingMorePage/PostingMoreTemplate';
// import { useGetLikedPaginatedFeedsQuery } from '@features/MyPage/api/userFeedsApi';

const LikedPostMorePage = (): JSX.Element => {
  const [posts, setPosts] = useState<BookDetailPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const { data, isLoading, isError } = useGetLikedPaginatedFeedsQuery({
  //   userId: 'user',
  //   feedType: 'post',
  //   page,
  // });

  // useEffect(() => {
  //   if (data?.feeds) {
  //     const newPosts = data.feeds.filter(
  //       (feed): feed is BookDetailPost => 'isbn' in feed,
  //     );
  //     setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  //     setHasMore(
  //       newPosts.length > 0 && posts.length + newPosts.length < data.totalFeeds,
  //     );
  //   }
  //   // eslint-disable-next-line
  // }, [data]);

  // const fetchMoreData = () => {
  //   if (!isLoading && !isError && hasMore) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  return (
    <PostingMoreTemplate
      totalPostings={data?.totalFeeds}
      postings={posts}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default LikedPostMorePage;
