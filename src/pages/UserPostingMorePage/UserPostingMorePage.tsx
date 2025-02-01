import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PostingMoreTemplate from '@components/PostingMorePage/PostingMoreTemplate';
import {
  useGetAllPostingsQuery,
  useGetUserPostingReviewCountsQuery,
} from '@features/MyPage/api/userFeedsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import {
  clearPostings,
  setHasMore,
  setPage,
  setPostings,
} from '@features/MyPage/slice/userPostingMoreSlice';

const UserPostingMorePage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();

  const { postings, hasMore, page } = useSelector(
    (state: RootState) => state.userPostings,
  );

  const limit = 5;

  const { data: feedsCount } = useGetUserPostingReviewCountsQuery({
    username: username || '',
  });

  const { data: fetchedData, isLoading } = useGetAllPostingsQuery(
    { username: username || '', page, limit },
    { skip: !username },
  );

  useEffect(() => {
    dispatch(clearPostings());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [username, dispatch]);

  useEffect(() => {
    if (fetchedData) {
      dispatch(setPostings(fetchedData));
      dispatch(setHasMore(fetchedData.length === limit));
    }
  }, [fetchedData, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, dispatch]);

  return (
    <PostingMoreTemplate
      totalPostings={feedsCount?.total_postings_count}
      postings={postings}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
    />
  );
};

export default UserPostingMorePage;
