import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneLineReview } from '@components/MyPage/types';

export interface BookReviewsState {
  reviews: OneLineReview[];
  hasMore: boolean;
  page: number;
}

const initialState: BookReviewsState = {
  reviews: [],
  hasMore: true,
  page: 1,
};

const bookReviewsSlice = createSlice({
  name: 'bookReviews',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<OneLineReview[]>) {
      const newReviews = action.payload.filter(
        (newReviews) =>
          !state.reviews.some((review) => review.postId === newReviews.postId),
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
  bookReviewsSlice.actions;

export default bookReviewsSlice.reducer;
