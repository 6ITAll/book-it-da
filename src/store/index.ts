import { configureStore } from '@reduxjs/toolkit';
import { bookApiReducers, bookApiMiddleware } from './api/bookApi';
import { libraryApiReducers, libraryApiMiddleware } from './api/libraryApi';
import { userApiReducers, userApiMiddleware } from './api/userApi';
import { feedApiReducers, feedApiMiddleware } from './api/feedApi';
import { postingApiReducers, postingApiMiddleware } from './api/postingApi';
import { mypageApiReducers, mypageApiMiddleware } from './api/mypageApi';
import { reviewApiReducers, reviewApiMiddleware } from './api/reviewApi';
import { commentApiReducers, commentApiMiddleware } from './api/commentApi';

import { bookReducers } from './slices/bookSlice';
import { libraryReducers } from './slices/librarySlice';
import { userReducers } from './slices/userSlice';
import { feedReducers } from './slices/feedSlice';
import { uiReducers } from './slices/uiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { commentReducers } from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    ...bookApiReducers,
    ...libraryApiReducers,
    ...userApiReducers,
    ...feedApiReducers,
    ...postingApiReducers,
    ...mypageApiReducers,
    ...reviewApiReducers,
    ...bookReducers,
    ...libraryReducers,
    ...userReducers,
    ...feedReducers,
    ...uiReducers,
    ...commentApiReducers,
    ...commentReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['payload.timestamp', 'meta.arg'],
      },
      immutableCheck: { warnAfter: 128 },
    }).concat([
      ...bookApiMiddleware,
      ...libraryApiMiddleware,
      ...userApiMiddleware,
      ...feedApiMiddleware,
      ...postingApiMiddleware,
      ...mypageApiMiddleware,
      ...reviewApiMiddleware,
      ...commentApiMiddleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
