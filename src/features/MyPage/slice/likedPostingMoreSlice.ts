import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@components/MyPage/types';

export interface LikedPostingsState {
  postings: Posting[]; // 포스팅 데이터 배열
  hasMore: boolean; // 더 가져올 데이터가 있는지 여부
  page: number; // 현재 페이지 번호
}

const initialState: LikedPostingsState = {
  postings: [],
  hasMore: true,
  page: 1,
};

const likedPostingsSlice = createSlice({
  name: 'likedReviews',
  initialState,
  reducers: {
    setPostings(state, action: PayloadAction<Posting[]>) {
      const newPostings = action.payload.filter(
        (newPosting) =>
          !state.postings.some(
            (posting) => posting.post_id === newPosting.post_id,
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
