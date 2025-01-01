import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import { libraryApi } from '@features/MyPage/api';
import { bookShelvesApi } from '@features/BookShelvesPage/api/bookShelvesApi';
import bookShelvesReducer from '@features/BookShelvesPage/slice/bookShelvesSlice';

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
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      bookSearchApi.middleware,
      bestBookGetApi.middleware,
      bookDetailApi.middleware,
      libraryApi.middleware,
      bookShelvesApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
