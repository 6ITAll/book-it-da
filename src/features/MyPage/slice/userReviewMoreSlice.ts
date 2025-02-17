import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneLineReview } from '@components/MyPage/types';

export interface UserReviewsState {
  reviews: OneLineReview[];
  hasMore: boolean;
  page: number;
}

const initialState: UserReviewsState = {
  reviews: [],
  hasMore: true,
  page: 1,
};

const userReviewsSlice = createSlice({
  name: 'userReviews',
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
    deleteReviews(state, action: PayloadAction<string[]>) {
      state.reviews = state.reviews.filter(
        (posting) => !action.payload.includes(posting.postId),
      );
    },
  },
});

export const { setReviews, clearReviews, setHasMore, setPage, deleteReviews } =
  userReviewsSlice.actions;

export default userReviewsSlice.reducer;
