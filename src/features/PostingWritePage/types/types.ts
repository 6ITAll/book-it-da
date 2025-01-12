import { Book, Posting, User } from '@shared/types/type';

export interface PostingRequest {
  userId: number;
  book: Book;
  title: string;
  content: string;
  user: Omit<User, 'isFollowing' | 'isFollower'>;
}

export interface UpdatePostingRequest extends PostingRequest {
  postingId: number;
}

export interface PostingResponse {
  success: boolean;
  message?: string;
  post?: Posting;
}
