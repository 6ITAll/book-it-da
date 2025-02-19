import { userFeedsApi } from '@features/MyPage/api/userFeedsApi';
import { userLikedFeedsApi } from '@features/MyPage/api/userLikedFeedsApi';

export const mypageApiReducers = {
  [userFeedsApi.reducerPath]: userFeedsApi.reducer,
  [userLikedFeedsApi.reducerPath]: userLikedFeedsApi.reducer,
};

export const mypageApiMiddleware = [
  userFeedsApi.middleware,
  userLikedFeedsApi.middleware,
];
