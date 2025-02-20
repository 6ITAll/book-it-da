import bookSearchReducer from '@features/BookSearchPage/Slice/bookSearchSlice';
import bookDetailReducer from '@features/BookSearchPage/Slice/bookDetailSlice';
import bookPostingsReducer from '@features/BookDetailPage/slice/bookPostingMoreSlice';
import bookReviewsReducer from '@features/BookDetailPage/slice/bookReviewMoreSlice';
import readerStatsReducer from '@features/BookDetailPage/slice/readerStatsSlice';

export const bookReducers = {
  bookSearch: bookSearchReducer,
  bookDetail: bookDetailReducer,
  bookPostings: bookPostingsReducer,
  bookReviews: bookReviewsReducer,
  readerStats: readerStatsReducer,
};
