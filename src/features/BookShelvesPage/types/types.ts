import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import { SavedBook } from '@shared/types/type';

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
