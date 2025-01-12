import { Book, Posting } from '@shared/types/type';

export interface PostingRequest {
  userId: number;
  book: Book;
  title: string;
  content: string;
}

export interface UpdatePostingRequest extends PostingRequest {
  postingId: number;
}

export interface PostingResponse {
  success: boolean;
  message?: string;
  post?: Posting;
}
