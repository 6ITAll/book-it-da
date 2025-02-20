import { oneLineReviewApi } from '@features/OneLineReviewDialog/api/oneLineReviewApi';

export const reviewApiReducers = {
  [oneLineReviewApi.reducerPath]: oneLineReviewApi.reducer,
};

export const reviewApiMiddleware = [oneLineReviewApi.middleware];
