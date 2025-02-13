import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/types';

export interface PostingCommentsState {
  comments: Comment[];
  hasMore: boolean;
  page: number;
}

const initialState: PostingCommentsState = {
  comments: [],
  hasMore: true,
  page: 1,
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
    removeComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
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
} = postingCommentsSlice.actions;

export default postingCommentsSlice.reducer;
