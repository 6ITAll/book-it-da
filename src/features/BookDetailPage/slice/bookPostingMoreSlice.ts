import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@components/MyPage/types';

export interface BookPostingsState {
  postings: Posting[];
  hasMore: boolean;
  page: number;
}

const initialState: BookPostingsState = {
  postings: [],
  hasMore: true,
  page: 1,
};

const bookPostingsSlice = createSlice({
  name: 'bookPostings',
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
  bookPostingsSlice.actions;

export default bookPostingsSlice.reducer;
