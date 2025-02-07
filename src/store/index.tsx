import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import { reviewStatsApi } from '@features/BookDetailPage/api/reviewStatsApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import { readerStatsApi } from '@features/BookDetailPage/api/readerStatsApi';
import { postApi } from '@features/BookDetailPage/api/postApi';
import { reviewApi } from '@features/BookDetailPage/api/reviewApi';
import userReducer from '@features/user/userSlice';
import { bookShelvesApi } from '@features/BookShelvesPage/api/bookShelvesApi';
import bookShelvesReducer from '@features/BookShelvesPage/slice/bookShelvesSlice';
import { postingApi } from '@features/PostDetailPage/api/postingApi';
import snackbarReducer from '@features/Snackbar/snackbarSlice';
import { libraryApi } from '@features/MyPage/api/libraryApi';
import { userFeedsApi } from '@features/MyPage/api/userFeedsApi';
import { feedApi } from '@features/FeedPage/api/feedApi';
import { oneLineReviewApi } from '@features/OneLineReviewDialog/api/oneLineReviewApi';
import { postingWriteApi } from '@features/PostingWritePage/api/postingWriteApi';
import { userApi } from '@features/user/userApi';
// import { mypageFollowApi } from '@features/MyPage/api/followApi';
import darkModeReducer from '@features/DarkMode/darkModeSlice';
import { followApi } from '@features/commons/followApi';
import feedReducer from '@features/FeedPage/slice/feedSlice';
import { likeApi } from '@features/commons/likeApi';
import { bookSearchByIsbnApi } from '@features/commons/bookSearchByIsbn';
import { additionalInfoApi } from '@features/user/additionalInfoApi';
import { userProfileStatsApi } from '@features/MyPage/api/userProfileStatsApi';
import { followListApi } from '@features/MyPage/api/followListApi';
import { userLikedFeedsApi } from '@features/MyPage/api/userLikedFeedsApi';
import userPostingsReducer from '@features/MyPage/slice/userPostingMoreSlice';
import userReviewsReducer from '@features/MyPage/slice/userReviewMoreSlice';
import likedPostingsReducer from '@features/MyPage/slice/likedPostingMoreSlice';
import likedReviewsReducer from '@features/MyPage/slice/likedReviewMoreSlice';
import followListReducer from '@features/MyPage/slice/followListSlice';
import readerStatsReducer from '@features/BookDetailPage/slice/readerStatsSlice';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookDetail: bookDetailReducer,
    bookshelves: bookShelvesReducer,
    darkMode: darkModeReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bookSearchByIsbnApi.reducerPath]: bookSearchByIsbnApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [bookDetailApi.reducerPath]: bookDetailApi.reducer,
    [reviewStatsApi.reducerPath]: reviewStatsApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [bookShelvesApi.reducerPath]: bookShelvesApi.reducer,
    [postingApi.reducerPath]: postingApi.reducer,
    [userFeedsApi.reducerPath]: userFeedsApi.reducer,
    [userLikedFeedsApi.reducerPath]: userLikedFeedsApi.reducer,
    [readerStatsApi.reducerPath]: readerStatsApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [oneLineReviewApi.reducerPath]: oneLineReviewApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [postingWriteApi.reducerPath]: postingWriteApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [additionalInfoApi.reducerPath]: additionalInfoApi.reducer,
    // [mypageFollowApi.reducerPath]: mypageFollowApi.reducer,
    [followListApi.reducerPath]: followListApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [userProfileStatsApi.reducerPath]: userProfileStatsApi.reducer,
    counter: counterReducer,
    user: userReducer,
    followList: followListReducer,
    likedPostings: likedPostingsReducer,
    likedReviews: likedReviewsReducer,
    userPostings: userPostingsReducer,
    userReviews: userReviewsReducer,
    snackbar: snackbarReducer,
    feed: feedReducer,
    readerStats: readerStatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bookSearchByIsbnApi.middleware,
      bestBookGetApi.middleware,
      bookDetailApi.middleware,
      reviewStatsApi.middleware,
      libraryApi.middleware,
      bookShelvesApi.middleware,
      postingApi.middleware,
      readerStatsApi.middleware,
      postApi.middleware,
      reviewApi.middleware,
      userFeedsApi.middleware,
      userLikedFeedsApi.middleware,
      feedApi.middleware,
      oneLineReviewApi.middleware,
      postingWriteApi.middleware,
      // mypageFollowApi.middleware,
      followListApi.middleware,
      userApi.middleware,
      additionalInfoApi.middleware,
      followApi.middleware,
      likeApi.middleware,
      userProfileStatsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
