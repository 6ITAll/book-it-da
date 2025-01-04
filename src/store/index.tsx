import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import { libraryApi } from '@features/MyPage/api';
import userReducer from './userSlice/userSlice';
import { bookShelvesApi } from '@features/BookShelvesPage/api/bookShelvesApi';
import bookShelvesReducer from '@features/BookShelvesPage/slice/bookShelvesSlice';
import { postingApi } from '@features/PostDetailPage/api/postingApi';
import { feedApi } from '@features/FeedPage/api/feedApi';
import { oneLineReviewApi } from '@features/OneLineReviewDialog/api/oneLineReviewApi';
import { postingWriteApi } from '@features/PostingWritePage/api/postingWriteApi';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookDetail: bookDetailReducer,
    bookshelves: bookShelvesReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [bookDetailApi.reducerPath]: bookDetailApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [bookShelvesApi.reducerPath]: bookShelvesApi.reducer,
    [postingApi.reducerPath]: postingApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [oneLineReviewApi.reducerPath]: oneLineReviewApi.reducer,
    [postingWriteApi.reducerPath]: postingWriteApi.reducer,
    counter: counterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      bookDetailApi.middleware,
      libraryApi.middleware,
      bookShelvesApi.middleware,
      postingApi.middleware,
      feedApi.middleware,
      oneLineReviewApi.middleware,
      postingWriteApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
