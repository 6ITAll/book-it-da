import { feedApi } from '@features/FeedPage/api/feedApi';
import { likeApi } from '@features/commons/likeApi';

export const feedApiReducers = {
  [feedApi.reducerPath]: feedApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
};

export const feedApiMiddleware = [feedApi.middleware, likeApi.middleware];
