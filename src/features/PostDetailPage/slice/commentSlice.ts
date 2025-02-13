import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/types';

export interface PostingCommentsState {
  comments: Comment[];
  hasMore: boolean;
  page: number;
  tempNewReplies: { [key: string]: Comment };
}

const initialState: PostingCommentsState = {
  comments: [],
  hasMore: true,
  page: 1,
  tempNewReplies: {},
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
} = postingCommentsSlice.actions;

export default postingCommentsSlice.reducer;
