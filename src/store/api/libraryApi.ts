import { libraryApi } from '@features/MyPage/api/libraryApi';
import { bookShelvesApi } from '@features/BookShelvesPage/api/bookShelvesApi';

export const libraryApiReducers = {
  [libraryApi.reducerPath]: libraryApi.reducer,
  [bookShelvesApi.reducerPath]: bookShelvesApi.reducer,
};

export const libraryApiMiddleware = [
  libraryApi.middleware,
  bookShelvesApi.middleware,
];
