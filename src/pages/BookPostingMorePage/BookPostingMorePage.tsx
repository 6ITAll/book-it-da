import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PostingMoreTemplate from '@components/PostingMorePage/PostingMoreTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  clearPostings,
  setHasMore,
  setPage,
  setPostings,
} from '@features/BookDetailPage/slice/bookPostingMoreSlice';
import { useGetBookPostCountQuery } from '@features/BookDetailPage/api/bookFeedPreviewApi';
import { useGetAllBookPostingsQuery } from '@features/BookDetailPage/api/bookPostingsApi';

const BookPostingMorePage = (): JSX.Element => {
  const { isbn } = useParams<{ isbn: string }>();
  const dispatch = useDispatch();

  const { postings, hasMore, page } = useSelector(
    (state: RootState) => state.bookPostings,
  );

  const limit = 5;

  const { data: bookPostCount } = useGetBookPostCountQuery({
    isbn: isbn || '',
  });

  const { data: fetchedPostings, isLoading } = useGetAllBookPostingsQuery(
    { isbn: isbn || '', page, limit },
    { skip: !isbn },
  );

  useEffect(() => {
    dispatch(clearPostings());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [isbn, dispatch]);

  useEffect(() => {
    if (fetchedPostings) {
      dispatch(setPostings(fetchedPostings));
      dispatch(setHasMore(fetchedPostings.length === limit));
    }
  }, [fetchedPostings, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, dispatch]);

  return (
    <PostingMoreTemplate
      totalPostings={bookPostCount?.posting_count}
      postings={postings}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default BookPostingMorePage;
