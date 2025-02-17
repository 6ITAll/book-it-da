import userReducer from '@features/user/userSlice';
import followListReducer from '@features/MyPage/slice/followListSlice';
import userPostingsReducer from '@features/MyPage/slice/userPostingMoreSlice';
import userReviewsReducer from '@features/MyPage/slice/userReviewMoreSlice';
import likedPostingsReducer from '@features/MyPage/slice/likedPostingMoreSlice';
import likedReviewsReducer from '@features/MyPage/slice/likedReviewMoreSlice';

export const userReducers = {
  user: userReducer,
  followList: followListReducer,
  userPostings: userPostingsReducer,
  userReviews: userReviewsReducer,
  likedPostings: likedPostingsReducer,
  likedReviews: likedReviewsReducer,
};
