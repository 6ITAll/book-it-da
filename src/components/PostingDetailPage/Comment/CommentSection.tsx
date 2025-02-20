import { useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCreateCommentMutation,
  useGetCommentCountQuery,
  useGetCommentsQuery,
} from '@features/PostDetailPage/api/commentApi';
import {
  clearComments,
  clearRepliesState,
  incrementReplyPage,
  setComments,
  setHasMore,
  setPage,
} from '@features/PostDetailPage/slice/commentSlice';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import LoadMoreRepliesButton from './LoadMoreRepliesButton';
import CommentReplies from './CommentReplies';
import TempNewReply from './TempNewReply';
import { COMMENTS_PER_PAGE } from '@constants/comment';

const CommentSection = ({ postId }: { postId: string }) => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.userInfo?.id,
  );
  const dispatch = useDispatch();

  const { comments, hasMore, page, showRepliesFor, replyPages } = useSelector(
    (state: RootState) => state.postingComments,
  );

  const { data: fetchedComments = [], isLoading } = useGetCommentsQuery(
    {
      postId,
      page,
      limit: COMMENTS_PER_PAGE,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      refetchOnFocus: false,
    },
  );
  const { data: commentCount = 0 } = useGetCommentCountQuery({ postId });
  const [createComment] = useCreateCommentMutation();

  useEffect(() => {
    dispatch(clearComments());
    dispatch(setPage(1));
    dispatch(clearRepliesState());
  }, [postId, dispatch]);

  useEffect(() => {
    if (fetchedComments && fetchedComments.length > 0) {
      const hasNewComments = fetchedComments.some(
        (newComment) =>
          !comments.some((comment) => comment.id === newComment.id),
      );
      if (hasNewComments) {
        dispatch(setComments(fetchedComments));
        dispatch(setHasMore(fetchedComments.length >= COMMENTS_PER_PAGE));
      }
    } else {
      dispatch(setHasMore(false));
    }
  }, [fetchedComments, comments, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore && fetchedComments?.length > 0) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, fetchedComments, dispatch]);

  const parentComments = useMemo(() => {
    return comments.filter((comment) => !comment.parentId);
  }, [comments]);

  // 댓글 작성
  const handleNewComment = async (content: string) => {
    if (!currentUserId) {
      dispatch(
        showSnackbar({
          message: '로그인 후 이용해 주세요.',
          severity: 'error',
        }),
      );
      return;
    }

    try {
      const result = await createComment({
        postId,
        content,
        userId: currentUserId,
      }).unwrap();
      dispatch(setComments([result]));
    } catch (error) {
      showSnackbar({
        message: '댓글 작성에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleLoadMoreReplies = useCallback(
    (commentId: string) => {
      dispatch(incrementReplyPage(commentId));
    },
    [dispatch],
  );

  return (
    <Box sx={{ mt: 4, p: 2, borderRadius: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        댓글 {commentCount}
      </Typography>
      <Box sx={{ my: 2 }}>
        <CommentInput onSubmit={handleNewComment} />
      </Box>
      <Divider sx={{ mb: 2 }} />

      <InfiniteScrollComponent
        items={parentComments}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
        endMessage="더 이상 댓글이 없습니다."
        gridSize={{ xs: 12, md: 12 }}
        renderItem={(comment) => (
          <>
            <CommentItem key={comment.id} comment={comment} postId={postId} />
            {showRepliesFor.includes(comment.id) && (
              <Box sx={{ ml: 5 }}>
                {!comment.parentId && (
                  <>
                    <TempNewReply
                      parentId={comment.id}
                      postId={postId}
                      currentPage={replyPages[comment.id] || 1}
                    />
                    <CommentReplies parentId={comment.id} postId={postId} />
                    <LoadMoreRepliesButton
                      parentId={comment.id}
                      currentPage={replyPages[comment.id] || 1}
                      onLoadMore={handleLoadMoreReplies}
                    />
                  </>
                )}
              </Box>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default CommentSection;
