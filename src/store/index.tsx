import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@/features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@/features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@/features/BookSearchPage/Slice/bookSearchSlice';
export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookSearchApi.middleware)
      .concat(bestBookGetApi.middleware), // 미들웨어 추가
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
