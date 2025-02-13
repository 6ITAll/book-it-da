import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
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
  clearTempNewReply,
  setComments,
  setHasMore,
  setPage,
} from '@features/PostDetailPage/slice/commentSlice';
import InfiniteScrollComponent from '@components/commons/InfiniteScroll';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';

export interface Like {
  userId: string;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  content: string;
  parentId: string | null;
  isEdited: boolean;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  likesCount: number;
  likes: string[];
  isLiked: boolean;
}

const ITEMS_PER_PAGE = 10;
const REPLIES_PER_PAGE = 5;

const CommentSection = ({ postId }: { postId: string }) => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.userInfo?.id,
  );
  const dispatch = useDispatch();

  const { comments, hasMore, page } = useSelector(
    (state: RootState) => state.postingComments,
  );

  const { tempNewReplies } = useSelector(
    (state: RootState) => state.postingComments,
  );

  const [showRepliesFor, setShowRepliesFor] = useState<Set<string>>(new Set());
  const [replyPages, setReplyPages] = useState<{ [key: string]: number }>({});

  const { data: fetchedComments = [], isLoading } = useGetCommentsQuery(
    {
      postId,
      page,
      limit: ITEMS_PER_PAGE,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: false,
      refetchOnFocus: false,
    },
  );
  const { data: commentCount = 0 } = useGetCommentCountQuery({ postId });
  console.log(commentCount);
  const [createComment] = useCreateCommentMutation();

  useEffect(() => {
    dispatch(clearComments());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  }, [postId, dispatch]);

  useEffect(() => {
    if (fetchedComments && fetchedComments.length > 0) {
      const hasNewComments = fetchedComments.some(
        (newComment) =>
          !comments.some((comment) => comment.id === newComment.id),
      );
      if (hasNewComments) {
        dispatch(setComments(fetchedComments));
        dispatch(setHasMore(fetchedComments.length === ITEMS_PER_PAGE));
      }
    }
  }, [fetchedComments, comments, dispatch]);

  const fetchMoreData = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(setPage(page + 1));
    }
  }, [isLoading, hasMore, page, dispatch]);

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
      console.log('댓글 작성 성공:', result);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const getReplies = useCallback(
    (parentId: string) => {
      const currentPage = replyPages[parentId] || 1;
      return comments
        .filter((comment) => comment.parentId === parentId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ) // 오래된 순으로 정렬
        .slice(0, currentPage * REPLIES_PER_PAGE);
    },
    [comments, replyPages],
  );

  const handleLoadMoreReplies = useCallback(
    (commentId: string) => {
      const nextPage = (replyPages[commentId] || 1) + 1;
      const willBeVisibleReplies = comments
        .filter((c) => c.parentId === commentId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .slice(0, nextPage * REPLIES_PER_PAGE);

      // 임시 답글이 이제 보이게 되는지 확인
      if (
        tempNewReplies[commentId] &&
        willBeVisibleReplies.some(
          (reply) => reply.id === tempNewReplies[commentId].id,
        )
      ) {
        dispatch(clearTempNewReply(commentId));
      }

      setReplyPages((prev) => ({
        ...prev,
        [commentId]: nextPage,
      }));
    },
    [comments, replyPages, tempNewReplies, dispatch],
  );

  const getTotalReplies = useCallback(
    (parentId: string) => {
      return comments.filter((comment) => comment.parentId === parentId).length;
    },
    [comments],
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

      {isLoading ? (
        <Typography>댓글을 불러오는 중...</Typography>
      ) : (
        <InfiniteScrollComponent
          items={parentComments}
          hasMore={hasMore}
          fetchMore={fetchMoreData}
          endMessage="더 이상 댓글이 없습니다."
          gridSize={{ xs: 12, md: 12 }}
          renderItem={(comment) => (
            <>
              <CommentItem
                key={comment.id}
                comment={comment}
                postId={postId}
                showRepliesFor={showRepliesFor}
                setShowRepliesFor={setShowRepliesFor}
              />
              {showRepliesFor.has(comment.id) && (
                <Box sx={{ ml: 5 }}>
                  {/* 임시로 보여주는 새 댓글 (답글이 많아서 내 댓글이 가려졌을 때만*/}
                  {tempNewReplies[comment.id] &&
                    comments
                      .filter((c) => c.parentId === comment.id)
                      .sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime(),
                      )
                      .findIndex(
                        (reply) => reply.id === tempNewReplies[comment.id].id,
                      ) >=
                      (replyPages[comment.id] || 1) * REPLIES_PER_PAGE && (
                      <CommentItem
                        key={`temp-${tempNewReplies[comment.id].id}`}
                        comment={tempNewReplies[comment.id]}
                        postId={postId}
                        showRepliesFor={showRepliesFor}
                        setShowRepliesFor={setShowRepliesFor}
                      />
                    )}
                  {getReplies(comment.id).map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      showRepliesFor={showRepliesFor}
                      setShowRepliesFor={setShowRepliesFor}
                    />
                  ))}
                  {getTotalReplies(comment.id) >
                    (replyPages[comment.id] || 1) * REPLIES_PER_PAGE && (
                    <Button
                      onClick={() => handleLoadMoreReplies(comment.id)}
                      sx={{
                        mt: 1,
                        color: 'text.secondary',
                        backgroundColor: 'transparent',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      답글{' '}
                      {getTotalReplies(comment.id) -
                        (replyPages[comment.id] || 1) * REPLIES_PER_PAGE}
                      개 더보기
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        />
      )}
    </Box>
  );
};

export default CommentSection;
