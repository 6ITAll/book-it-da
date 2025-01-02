import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import { libraryApi } from '@features/MyPage/api';
import { postingApi } from '@features/PostDetailPage/api/postingApi';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookDetail: bookDetailReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [bookDetailApi.reducerPath]: bookDetailApi.reducer,
    [libraryApi.reducerPath]: libraryApi.reducer,
    [postingApi.reducerPath]: postingApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      bookDetailApi.middleware,
      libraryApi.middleware,
      postingApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
