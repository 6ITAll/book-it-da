import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  clearReviews,
  setHasMore,
  setPage,
  setReviews,
} from '@features/BookDetailPage/slice/bookReviewMoreSlice';
import ReviewMorePageTemplate from '@components/ReviewMorePage/ReviewMorePageTemplate';
import { useGetAllBookReviewsQuery } from '@features/BookDetailPage/api/bookReviewsApi';
import { useGetBookPostCountQuery } from '@features/BookDetailPage/api/bookFeedPreviewApi';

const BookReviewMorePage = (): JSX.Element => {
  const { isbn } = useParams<{ isbn: string }>();
  const dispatch = useDispatch();

  const { reviews, hasMore, page } = useSelector(
    (state: RootState) => state.bookReviews,
  );

  const limit = 10;

  const { data: bookPostCount } = useGetBookPostCountQuery({
    isbn: isbn || '',
  });

  const { data: fetchedReviews, isLoading } = useGetAllBookReviewsQuery(
    { isbn: isbn || '', page, limit },
    { skip: !isbn },
  );

  console.log(fetchedReviews);

  useEffect(() => {
    dispatch(clearReviews());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [isbn, dispatch]);

  useEffect(() => {
    if (fetchedReviews) {
      dispatch(setReviews(fetchedReviews));
      dispatch(setHasMore(fetchedReviews.length === limit));
    }
  }, [fetchedReviews, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, dispatch]);

  return (
    <ReviewMorePageTemplate
      totalReviews={bookPostCount?.review_count ?? 0}
      reviews={reviews}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default BookReviewMorePage;
