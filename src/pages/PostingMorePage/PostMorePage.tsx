import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPaginatedPostsQuery } from '@features/BookDetailPage/api/postApi';
import { BookDetailPost } from '@shared/types/type';
import PostingMoreTemplate from '@components/PostingMorePage/PostingMoreTemplate';

const PostingMorePage = (): JSX.Element => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const { isbn } = bookDetails || {};

  const [posting, setPosting] = useState<BookDetailPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isError } = useGetPaginatedPostsQuery({
    isbn,
    page,
  });

  useEffect(() => {
    if (data?.postings) {
      setPosting((prevPostings) => [...prevPostings, ...data.postings]);
      if (data.postings.length < 10) setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    if (!isLoading && !isError) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <PostingMoreTemplate
      totalPostings={data?.totalPostings}
      postings={posting}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default PostingMorePage;
