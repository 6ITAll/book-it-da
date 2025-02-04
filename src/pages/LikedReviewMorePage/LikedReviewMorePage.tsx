import ReviewMorePageTemplate from '@components/ReviewMorePage/ReviewMorePageTemplate';
import {
  useGetLikedOneLineReviewsQuery,
  useGetUserLikedCountsQuery,
} from '@features/MyPage/api/userLikedFeedsApi';
import {
  clearReviews,
  setHasMore,
  setPage,
  setReviews,
} from '@features/MyPage/slice/likedReviewMoreSlice';
import { RootState } from '@store/index';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const LikedReviewMorePage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();

  const { reviews, hasMore, page } = useSelector(
    (state: RootState) => state.likedReviews,
  );

  const limit = 10;

  const { data: likedCount } = useGetUserLikedCountsQuery({
    username: username || '',
  });

  const { data: fetchedData, isLoading } = useGetLikedOneLineReviewsQuery(
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
      totalReviews={likedCount?.totalLikedReviewsCount ?? 0}
      reviews={reviews}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
      likedReview={true}
    />
  );
};

export default LikedReviewMorePage;
