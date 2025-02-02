import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneLineReview } from '@components/MyPage/types';

export interface LikedReviewsState {
  reviews: OneLineReview[]; // 포스팅 데이터 배열
  hasMore: boolean; // 더 가져올 데이터가 있는지 여부
  page: number; // 현재 페이지 번호
}

const initialState: LikedReviewsState = {
  reviews: [],
  hasMore: true,
  page: 1,
};

const likedReviewsSlice = createSlice({
  name: 'likedReviews',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<OneLineReview[]>) {
      const newReviews = action.payload.filter(
        (newReviews) =>
          !state.reviews.some(
            (review) => review.post_id === newReviews.post_id,
          ),
      );
      state.reviews = [...state.reviews, ...newReviews];
    },
    clearReviews(state) {
      state.reviews = [];
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

export const { setReviews, clearReviews, setHasMore, setPage } =
  likedReviewsSlice.actions;

export default likedReviewsSlice.reducer;
