// import { configureStore } from '@reduxjs/toolkit';
// import type { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
// import { bookApiMiddleware } from './api/bookApi';
// import { libraryApiMiddleware } from './api/libraryApi';
// import { userApiMiddleware } from './api/userApi';
// import { feedApiMiddleware } from './api/feedApi';
// import { postingApiMiddleware } from './api/postingApi';
// import { mypageApiMiddleware } from './api/mypageApi';
// import { reviewApiMiddleware } from './api/reviewApi';

// export const middleware = (getDefaultMiddleware: GetDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: ['persist/PERSIST'],
//       ignoredPaths: ['payload.timestamp', 'meta.arg'],
//     },
//     immutableCheck: { warnAfter: 128 },
//   }).concat([
//     ...bookApiMiddleware,
//     ...libraryApiMiddleware,
//     ...userApiMiddleware,
//     ...feedApiMiddleware,
//     ...postingApiMiddleware,
//     ...mypageApiMiddleware,
//     ...reviewApiMiddleware,
//   ]);
