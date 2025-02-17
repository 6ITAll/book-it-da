import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@components/MyPage/types';

export interface LikedPostingsState {
  postings: Posting[];
  hasMore: boolean;
  page: number;
}

const initialState: LikedPostingsState = {
  postings: [],
  hasMore: true,
  page: 1,
};

const likedPostingsSlice = createSlice({
  name: 'likedPostings',
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
  },
});

export const { setPostings, clearPostings, setHasMore, setPage } =
  likedPostingsSlice.actions;

export default likedPostingsSlice.reducer;
