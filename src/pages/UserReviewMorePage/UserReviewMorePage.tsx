import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetAllOneLineReviewsQuery,
  useGetUserPostingReviewCountsQuery,
} from '@features/MyPage/api/userFeedsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  clearReviews,
  setHasMore,
  setPage,
  setReviews,
} from '@features/MyPage/slice/userReviewMoreSlice';
import ReviewMorePageTemplate from '@components/ReviewMorePage/ReviewMorePageTemplate';

const UserReviewMorePage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();

  const { reviews, hasMore, page } = useSelector(
    (state: RootState) => state.userReviews,
  );

  const limit = 10;

  const { data: feedsCount } = useGetUserPostingReviewCountsQuery({
    username: username || '',
  });

  const { data: fetchedData, isLoading } = useGetAllOneLineReviewsQuery(
    { username: username || '', page, limit },
    { skip: !username },
  );

  useEffect(() => {
    dispatch(clearReviews());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [username, dispatch]);

  useEffect(() => {
    if (fetchedData) {
      dispatch(setReviews(fetchedData));
      dispatch(setHasMore(fetchedData.length === limit));
    }
  }, [fetchedData, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, dispatch]);

  return (
    <ReviewMorePageTemplate
      totalReviews={feedsCount?.total_reviews_count ?? 0}
      reviews={reviews}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default UserReviewMorePage;
