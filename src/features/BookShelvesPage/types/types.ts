import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import { ReadingStatusType, SavedBook } from '@shared/types/type';

export interface BookInfo {
  itemId: number;
  bookTitle: string;
  author: string;
  imageUrl: string;
}

export interface UserBookStatus {
  id: number;
  userId: number;
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
  userId: number;
  bookshelfId: number;
}

export interface BookshelvesState {
  viewMode: ViewMode;
  sortOption: SortOption;
}

export interface UpdateReadingStatusRequest {
  userId: number;
  bookshelfId: number;
  bookId: number;
  readingStatus: ReadingStatusType;
}

export interface DeleteBookFromShelfParams {
  userId: number;
  bookshelfId: number;
  bookId: number;
}
