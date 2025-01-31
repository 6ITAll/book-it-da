import { SortOption, ViewMode } from '@components/BookShelvesPage/types';
import { ReadingStatusType, SavedBook } from '@shared/types/type';

export interface BookInfo {
  isbn: string;
  bookTitle: string;
  author: string;
  imageUrl: string;
}

export interface UserBookStatus {
  id: number;
  userId: string;
  bookshelfId: number;
  savedAt: string;
  readingStatus: ReadingStatusType;
}

export interface GetBookshelfResponse {
  bookshelfId: number;
  bookshelfName: string;
  books: SavedBook[];
  totalCount: number;
}

export interface GetBookshelfParams {
  userId: string;
  bookshelfId: number;
}

export interface BookshelvesState {
  viewMode: ViewMode;
  sortOption: SortOption;
}

export interface UpdateReadingStatusRequest {
  userId: string;
  bookshelfId: number;
  bookId: number;
  readingStatus: ReadingStatusType;
}

export interface DeleteBookFromShelfParams {
  userId: string;
  bookshelfId: number;
  bookId: number;
}
