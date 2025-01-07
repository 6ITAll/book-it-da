import { Book, Posting, User } from '@shared/types/type';

export interface PostingRequest {
  book: Book;
  title: string;
  content: string;
  user: User;
}

export interface PostingResponse {
  success: boolean;
  message?: string;
  post?: Posting;
}
