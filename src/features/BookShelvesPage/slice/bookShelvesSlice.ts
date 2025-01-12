import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { SavedBook, ReadingStatusType } from '@shared/types/type';

export interface BookshelvesState {
  viewMode: ViewMode;
  sortOption: SortOption;
  books: SavedBook[];
  totalCount: number;
  bookshelfName: string;
}

const initialState: BookshelvesState = {
  viewMode: 'grid',
  sortOption: 'recent',
  books: [],
  totalCount: 0,
  bookshelfName: '',
};

export const bookShelvesSlice = createSlice({
  name: 'bookshelves',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setBooks: (state, action: PayloadAction<SavedBook[]>) => {
      state.books = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setBookshelfName: (state, action: PayloadAction<string>) => {
      state.bookshelfName = action.payload;
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter(
        (book) => book.itemId !== action.payload,
      );
      state.totalCount -= 1;
    },
    updateReadingStatus: (
      state,
      action: PayloadAction<{
        itemId: number;
        readingStatus: ReadingStatusType;
      }>,
    ) => {
      const book = state.books.find(
        (book) => book.itemId === action.payload.itemId,
      );
      if (book) {
        book.readingStatus = action.payload.readingStatus;
      }
    },
  },
});

export const {
  setViewMode,
  setSortOption,
  setBooks,
  setTotalCount,
  setBookshelfName,
  deleteBook,
  updateReadingStatus,
} = bookShelvesSlice.actions;

export default bookShelvesSlice.reducer;
