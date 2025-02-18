import { commentApi } from '@features/PostDetailPage/api/commentApi';

export const commentApiReducers = {
  [commentApi.reducerPath]: commentApi.reducer,
};

export const commentApiMiddleware = [commentApi.middleware];
