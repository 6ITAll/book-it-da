import { ReadingStatusType, SavedBook } from '@shared/types/type';

export interface BookInfo {
  isbn: string;
  bookTitle: string;
  author: string;
  imageUrl: string;
}

export interface GetBookshelfResponse {
  books: SavedBook[];
  totalCount: number;
  bookshelfName: string;
}

export interface DeleteBookRequest {
  bookshelfId: string;
  isbn: string;
}

export interface BookshelfWithLibrary {
  name: string;
  library: {
    user_id: string;
  };
}

export interface BookshelfBook {
  isbn: string;
  added_at: string;
}

export interface ReadingStatus {
  isbn: string;
  status: ReadingStatusType;
}

export interface UpdateReadingStatusRequest {
  userId: string;
  isbn: string;
  status: ReadingStatusType;
}

export interface Bookshelf {
  id: string;
  name: string;
}

export interface GetBookshelvesResponse {
  bookshelves: Bookshelf[];
}

export interface CreateBookshelfRequest {
  userId: string;
  name: string;
}

export interface AddBookRequest {
  bookshelfId: string;
  isbn: string;
}
