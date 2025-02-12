import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { UserInfo } from '@features/user/userSlice';
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from '@features/PostDetailPage/api/commentApi';
import {
  clearComments,
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

const CommentSection = ({ postId }: { postId: string }) => {
  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );
  const dispatch = useDispatch();

  const { comments, hasMore, page } = useSelector(
    (state: RootState) => state.postingComments,
  );

  const [showRepliesFor, setShowRepliesFor] = useState<Set<string>>(new Set());

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

  const getReplies = useCallback(
    (parentId: string) => {
      return comments.filter((comment) => comment.parentId === parentId);
    },
    [comments],
  );

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
      });
      console.log('댓글 작성 성공:', result);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2, borderRadius: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        댓글
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
                setShowRepliesFor={setShowRepliesFor}
              />
              {showRepliesFor.has(comment.id) && (
                <Box sx={{ ml: 5 }}>
                  {getReplies(comment.id).map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      setShowRepliesFor={setShowRepliesFor}
                    />
                  ))}
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
