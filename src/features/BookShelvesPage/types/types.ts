import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import { ReadingStatusType, SavedBook } from '@shared/types/type';

export interface GetBookshelfResponse {
  books: SavedBook[];
  bookshelfName: string;
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
