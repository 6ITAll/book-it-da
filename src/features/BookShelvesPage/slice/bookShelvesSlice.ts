import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOption, ViewMode } from '@components/BookShelvesPage/types';
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
    deleteBookfromBookShelf: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.isbn !== action.payload);
      state.totalCount -= 1;
    },
    updateReadingStatus: (
      state,
      action: PayloadAction<{
        isbn: string;
        readingStatus: ReadingStatusType;
      }>,
    ) => {
      const book = state.books.find(
        (book) => book.isbn === action.payload.isbn,
      );
      if (book) {
        book.readingStatus = action.payload.readingStatus;
      }
    },
    updateBookInfo: (
      state,
      action: PayloadAction<{
        isbn: string;
        title: string;
        author: string;
        imageUrl: string;
      }>,
    ) => {
      const book = state.books.find(
        (book) => book.isbn === action.payload.isbn,
      );
      if (book) {
        book.title = action.payload.title;
        book.author = action.payload.author;
        book.imageUrl = action.payload.imageUrl;
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
  deleteBookfromBookShelf,
  updateReadingStatus,
  updateBookInfo,
} = bookShelvesSlice.actions;

export default bookShelvesSlice.reducer;
