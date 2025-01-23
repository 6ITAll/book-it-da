import { Book, Posting } from '@shared/types/type';

export interface PostingRequest {
  book: Book;
  title: string;
  content: string;
}

export interface UpdatePostingRequest extends PostingRequest {
  postingId: string;
}

export interface PostingResponse {
  success: boolean;
  message?: string;
  post?: Posting;
}
