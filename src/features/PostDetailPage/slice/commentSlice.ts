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
      state.comments = [...state.comments, ...newComments];
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
    deleteComments(state, action: PayloadAction<string[]>) {
      state.comments = state.comments.filter(
        (comment) => !action.payload.includes(comment.id),
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
  deleteComments,
  toggleCommentLike,
} = postingCommentsSlice.actions;

export default postingCommentsSlice.reducer;
