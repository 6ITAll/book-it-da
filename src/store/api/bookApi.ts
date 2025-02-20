import { bookSearchApi } from '@features/BookSearchPage/api/bookSearchApi';
import { bookSearchByIsbnApi } from '@features/commons/bookSearchByIsbn';
import { bestBookGetApi } from '@features/BookSearchPage/api/bestBookGetApi';
import { bookDetailApi } from '@features/BookSearchPage/api/bookDetailApi';
import { reviewStatsApi } from '@features/BookDetailPage/api/reviewStatsApi';
import { readerStatsApi } from '@features/BookDetailPage/api/readerStatsApi';
import { bookPostingsApi } from '@features/BookDetailPage/api/bookPostingsApi';
import { bookReviewsApi } from '@features/BookDetailPage/api/bookReviewsApi';
import { bookOwnReviewApi } from '@features/BookDetailPage/api/bookOwnReviewApi';
import { bookFeedPreviewApi } from '@features/BookDetailPage/api/bookFeedPreviewApi';

export const bookApiReducers = {
  [bookSearchApi.reducerPath]: bookSearchApi.reducer,
  [bookSearchByIsbnApi.reducerPath]: bookSearchByIsbnApi.reducer,
  [bestBookGetApi.reducerPath]: bestBookGetApi.reducer,
  [bookDetailApi.reducerPath]: bookDetailApi.reducer,
  [reviewStatsApi.reducerPath]: reviewStatsApi.reducer,
  [readerStatsApi.reducerPath]: readerStatsApi.reducer,
  [bookPostingsApi.reducerPath]: bookPostingsApi.reducer,
  [bookReviewsApi.reducerPath]: bookReviewsApi.reducer,
  [bookOwnReviewApi.reducerPath]: bookOwnReviewApi.reducer,
  [bookFeedPreviewApi.reducerPath]: bookFeedPreviewApi.reducer,
};

export const bookApiMiddleware = [
  bookSearchApi.middleware,
  bookSearchByIsbnApi.middleware,
  bestBookGetApi.middleware,
  bookDetailApi.middleware,
  reviewStatsApi.middleware,
  readerStatsApi.middleware,
  bookPostingsApi.middleware,
  bookReviewsApi.middleware,
  bookOwnReviewApi.middleware,
  bookFeedPreviewApi.middleware,
];
