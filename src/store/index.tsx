import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { kakaoApi } from '@features/SNSLogin/api/Kakaoapi';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import userReducer from '@features/user/userSlice';
import { bookShelvesApi } from '@features/BookShelvesPage/api/bookShelvesApi';
import bookShelvesReducer from '@features/BookShelvesPage/slice/bookShelvesSlice';
import { postingApi } from '@features/PostDetailPage/api/postingApi';
import snackbarReducer from '@features/Snackbar/snackbarSlice';
import { libraryApi } from '@features/MyPage/libraryApi';
import { userFeedsApi } from '@features/MyPage/userFeedsApi';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookDetail: bookDetailReducer,
    bookshelves: bookShelvesReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [kakaoApi.reducerPath]: kakaoApi.reducer,
    [bookDetailApi.reducerPath]: bookDetailApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [bookShelvesApi.reducerPath]: bookShelvesApi.reducer,
    [postingApi.reducerPath]: postingApi.reducer,
    [userFeedsApi.reducerPath]: userFeedsApi.reducer,
    counter: counterReducer,
    user: userReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      kakaoApi.middleware,
      bookDetailApi.middleware,
      libraryApi.middleware,
      bookShelvesApi.middleware,
      postingApi.middleware,
      userFeedsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
