import { postingApi } from '@features/PostDetailPage/api/postingApi';
import { postingWriteApi } from '@features/PostingWritePage/api/postingWriteApi';

export const postingApiReducers = {
  [postingApi.reducerPath]: postingApi.reducer,
  [postingWriteApi.reducerPath]: postingWriteApi.reducer,
};

export const postingApiMiddleware = [
  postingApi.middleware,
  postingWriteApi.middleware,
];
