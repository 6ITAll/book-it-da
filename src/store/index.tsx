import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import { libraryApi } from '@features/MyPage/api';
import { genderAgeApi } from '@features/BookDetailPage/api/genderAgeApi';
import { postApi } from '@features/BookDetailPage/api/postApi';
import { reviewApi } from '@features/BookDetailPage/api/reviewApi';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookDetail: bookDetailReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [bookDetailApi.reducerPath]: bookDetailApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [genderAgeApi.reducerPath]: genderAgeApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      bookDetailApi.middleware,
      libraryApi.middleware,
      genderAgeApi.middleware,
      postApi.middleware,
      reviewApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
