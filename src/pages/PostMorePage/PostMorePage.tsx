import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPaginatedPostsQuery } from '@features/BookDetailPage/api/postApi';
import { BookDetailPost } from '@shared/types/type';
import PostMoreTemplate from '@components/PostMorePage/PostMoreTemplate';

const PostMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { isbn } = bookDetails || {};

  const [posts, setPosts] = useState<BookDetailPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError } = useGetPaginatedPostsQuery({
    isbn,
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
    <PostMoreTemplate
      totalPosts={data?.totalPosts}
      posts={posts}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default PostMorePage;
