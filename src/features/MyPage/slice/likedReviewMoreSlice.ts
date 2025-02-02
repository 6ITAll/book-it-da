import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneLineReview } from '@components/MyPage/types';

export interface LikedReviewsState {
  reviews: OneLineReview[];
  hasMore: boolean;
  page: number;
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
