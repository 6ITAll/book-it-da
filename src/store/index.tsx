import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { kakaoApi } from '@features/SNSLogin/api/Kakaoapi';

export const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
    [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
    [kakaoApi.reducerPath]: kakaoApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      kakaoApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
