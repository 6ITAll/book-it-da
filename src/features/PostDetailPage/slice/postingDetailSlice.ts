import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@shared/types/type';

export interface PostingDetailState {
  currentPost: Posting | null;
}

const initialState: PostingDetailState = {
  currentPost: null,
};

const postingDetailSlice = createSlice({
  name: 'postingDetail',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Posting>) => {
      state.currentPost = action.payload;
    },
    updateLikeStatus: (state, action: PayloadAction<boolean>) => {
      if (state.currentPost) {
        state.currentPost.isLiked = action.payload;
        state.currentPost.likeCount += action.payload ? 1 : -1;
      }
    },
    updateFollowStatus: (state, action: PayloadAction<boolean>) => {
      if (state.currentPost?.user) {
        state.currentPost.user.isFollowing = action.payload;
      }
    },
  },
});

export const { setCurrentPost, updateLikeStatus, updateFollowStatus } =
  postingDetailSlice.actions;
export default postingDetailSlice.reducer;
