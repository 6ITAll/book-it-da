import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Posting } from '@components/MyPage/types';

export interface UserPostingsState {
  postings: Posting[]; // 포스팅 데이터 배열
  hasMore: boolean; // 더 가져올 데이터가 있는지 여부
  page: number; // 현재 페이지 번호
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
    deletePostings(state, action: PayloadAction<string[]>) {
      // 선택된 post_id를 기준으로 삭제
      state.postings = state.postings.filter(
        (posting) => !action.payload.includes(posting.post_id),
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
