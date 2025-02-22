import { userApi } from '@features/user/userApi';
import { additionalInfoApi } from '@features/user/additionalInfoApi';
import { followListApi } from '@features/MyPage/api/followListApi';
import { followApi } from '@features/commons/followApi';
import { userProfileStatsApi } from '@features/MyPage/api/userProfileStatsApi';
import { avatarUrlApi } from '@features/user/avatarUrlApi';

export const userApiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [additionalInfoApi.reducerPath]: additionalInfoApi.reducer,
  [followListApi.reducerPath]: followListApi.reducer,
  [followApi.reducerPath]: followApi.reducer,
  [userProfileStatsApi.reducerPath]: userProfileStatsApi.reducer,
  [avatarUrlApi.reducerPath]: avatarUrlApi.reducer,
};

export const userApiMiddleware = [
  userApi.middleware,
  additionalInfoApi.middleware,
  followListApi.middleware,
  followApi.middleware,
  userProfileStatsApi.middleware,
  avatarUrlApi.middleware,
];
