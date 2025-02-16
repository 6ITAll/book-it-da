import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@components/MyPage/types';

export interface UserPostingsState {
  postings: Posting[];
  hasMore: boolean;
  page: number;
}

const initialState: UserPostingsState = {
  postings: [],
  hasMore: true,
  page: 1,
};

const userPostingsSlice = createSlice({
  name: 'userPostings',
  initialState,
  reducers: {
    setPostings(state, action: PayloadAction<Posting[]>) {
      const newPostings = action.payload.filter(
        (newPosting) =>
          !state.postings.some(
            (posting) => posting.postId === newPosting.postId,
          ),
      );
      state.postings = [...state.postings, ...newPostings];
    },
    clearPostings(state) {
      state.postings = [];
      state.hasMore = true;
      state.page = 1;
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    deletePostings(state, action: PayloadAction<string[]>) {
      state.postings = state.postings.filter(
        (posting) => !action.payload.includes(posting.postId),
      );
    },
  },
});

export const {
  setPostings,
  clearPostings,
  setHasMore,
  setPage,
  deletePostings,
} = userPostingsSlice.actions;

export default userPostingsSlice.reducer;
