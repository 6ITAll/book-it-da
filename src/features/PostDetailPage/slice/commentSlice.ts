import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/types';

export interface PostingCommentsState {
  comments: Comment[];
  hasMore: boolean;
  page: number;
  tempNewReplies: { [key: string]: Comment };
  showRepliesFor: string[];
  replyPages: { [key: string]: number };
  visibleReplies: {
    [parentId: string]: Comment[];
  };
}

const initialState: PostingCommentsState = {
  comments: [],
  hasMore: true,
  page: 1,
  tempNewReplies: {},
  showRepliesFor: [],
  replyPages: {},
  visibleReplies: {},
};

const postingCommentsSlice = createSlice({
  name: 'postingComments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      const newComments = action.payload.filter(
        (newComment) =>
          !state.comments.some((comment) => comment.id === newComment.id),
      );
      // 날짜순으로 정렬하여 합치기
      const allComments = [...state.comments, ...newComments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      state.comments = allComments;
    },
    clearComments(state) {
      state.comments = [];
      state.hasMore = true;
      state.page = 1;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    editComment(
      state,
      action: PayloadAction<{ commentId: string; content: string }>,
    ) {
      const { commentId, content } = action.payload;
      const comment = state.comments.find(
        (comment) => comment.id === commentId,
      );

      if (comment) {
        comment.content = content;
        comment.isEdited = true;
        comment.updatedAt = new Date().toISOString();
      }

      Object.entries(state.tempNewReplies).forEach(([parentId, reply]) => {
        if (reply.id === commentId) {
          state.tempNewReplies[parentId] = {
            ...reply,
            content,
            isEdited: true,
            updatedAt: new Date().toISOString(),
          };
        }
      });
    },
    removeComment(
      state,
      action: PayloadAction<{
        commentId: string;
        hasReplies: boolean;
        parentId: string | null;
        isParentDeleted?: boolean; // 부모 댓글도 삭제되었는지 여부
      }>,
    ) {
      if (!action.payload.hasReplies) {
        // 일반 삭제
        state.comments = state.comments.filter(
          (c) => c.id !== action.payload.commentId,
        );

        // 임시 댓글 삭제
        Object.keys(state.tempNewReplies).forEach((parentId) => {
          if (state.tempNewReplies[parentId].id === action.payload.commentId) {
            delete state.tempNewReplies[parentId];
          }
        });

        // 부모 댓글도 삭제된 경우
        if (action.payload.isParentDeleted && action.payload.parentId) {
          state.comments = state.comments.filter(
            (c) => c.id !== action.payload.parentId,
          );
        }
      } else {
        // 답글이 있는 경우 삭제 상태로 변경
        const comment = state.comments.find(
          (c) => c.id === action.payload.commentId,
        );
        if (comment) {
          comment.isDeleted = true;
          comment.content = '삭제된 댓글입니다';
        }
      }
    },

    toggleCommentLike(
      state,
      action: PayloadAction<{ commentId: string; userId: string }>,
    ) {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find(
        (comment) => comment.id === commentId,
      );
      // 실제 댓글 업데이트 (부모 댓글)
      if (comment) {
        const likeIndex = comment.likes.indexOf(userId);
        if (likeIndex === -1) {
          comment.likes.push(userId);
          comment.likesCount += 1;
        } else {
          comment.likes.splice(likeIndex, 1);
          comment.likesCount -= 1;
        }
      }
      // 실제 댓글 업데이트 (자식 댓글)
      Object.keys(state.visibleReplies).forEach((parentId) => {
        const reply = state.visibleReplies[parentId].find(
          (r) => r.id === commentId,
        );
        if (reply) {
          const likeIndex = reply.likes.indexOf(userId);
          if (likeIndex === -1) {
            reply.likes.push(userId);
            reply.likesCount += 1;
          } else {
            reply.likes.splice(likeIndex, 1);
            reply.likesCount -= 1;
          }
        }
      });

      // 임시 댓글 업데이트
      Object.entries(state.tempNewReplies).forEach(([parentId, reply]) => {
        if (reply.id === commentId) {
          const likeIndex = reply.likes.indexOf(userId);
          if (likeIndex === -1) {
            state.tempNewReplies[parentId] = {
              ...reply,
              likes: [...reply.likes, userId],
              likesCount: reply.likesCount + 1,
            };
          } else {
            state.tempNewReplies[parentId] = {
              ...reply,
              likes: reply.likes.filter((id) => id !== userId),
              likesCount: reply.likesCount - 1,
            };
          }
        }
      });
    },
    setTempNewReply(
      state,
      action: PayloadAction<{ parentId: string; reply: Comment }>,
    ) {
      const { parentId, reply } = action.payload;
      state.tempNewReplies[parentId] = reply;
    },

    clearTempNewReply(state, action: PayloadAction<string>) {
      delete state.tempNewReplies[action.payload];
    },

    toggleShowReplies(state, action: PayloadAction<string>) {
      const commentId = action.payload;
      const index = state.showRepliesFor.indexOf(commentId);
      console.log('toggle');

      if (index === -1) {
        state.showRepliesFor.push(commentId);
        // 답글 페이지 초기화
        state.replyPages[commentId] = 1;
        state.visibleReplies[commentId] = [];
      } else {
        state.showRepliesFor.splice(index, 1);
        // 답글 페이지 상태 제거
        delete state.replyPages[commentId];
        delete state.visibleReplies[commentId];
      }
    },
    incrementReplyPage(state, action: PayloadAction<string>) {
      const commentId = action.payload;
      state.replyPages[commentId] = (state.replyPages[commentId] || 1) + 1;
    },

    clearRepliesState(state) {
      state.showRepliesFor = [];
      state.replyPages = {};
      state.visibleReplies = {};
    },

    updateVisibleReplies(
      state,
      action: PayloadAction<{ parentId: string; replies: Comment[] }>,
    ) {
      const { parentId, replies } = action.payload;
      const existingReplies = state.visibleReplies[parentId] || [];
      // 새로운 답글만 추가
      const newReplies = replies.filter(
        (newReply) =>
          !existingReplies.some((existing) => existing.id === newReply.id),
      );
      state.visibleReplies[parentId] = [...existingReplies, ...newReplies];
    },
  },
});

export const {
  setComments,
  clearComments,
  setHasMore,
  setPage,
  removeComment,
  toggleCommentLike,
  editComment,
  setTempNewReply,
  clearTempNewReply,
  toggleShowReplies,
  incrementReplyPage,
  clearRepliesState,
  updateVisibleReplies,
} = postingCommentsSlice.actions;

export default postingCommentsSlice.reducer;
