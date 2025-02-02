import PostingMoreTemplate from '@components/PostingMorePage/PostingMoreTemplate';
import {
  useGetLikedPostingsQuery,
  useGetUserLikedCountsQuery,
} from '@features/MyPage/api/userLikedFeedsApi';
import {
  clearPostings,
  setHasMore,
  setPage,
  setPostings,
} from '@features/MyPage/slice/likedPostingMoreSlice';
import { RootState } from '@store/index';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const LikedPostingMorePage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();

  const { postings, hasMore, page } = useSelector(
    (state: RootState) => state.likedPostings,
  );

  const limit = 5;

  const { data: likedCount } = useGetUserLikedCountsQuery({
    username: username || '',
  });

  const { data: fetchedData, isLoading } = useGetLikedPostingsQuery(
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
      totalPostings={likedCount?.total_liked_postings_count}
      postings={postings}
      hasMore={hasMore}
      fetchMoreData={fetchMoreData}
      likedPosting={true}
    />
  );
};

export default LikedPostingMorePage;
