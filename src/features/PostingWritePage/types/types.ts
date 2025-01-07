import { Book, Posting, User } from '@shared/types/type';

export interface PostingRequest {
  book: Book;
  title: string;
  content: string;
  user: Omit<User, 'isFollowing' | 'isFollower'>;
}

export interface PostingResponse {
  success: boolean;
  message?: string;
  post?: Posting;
}
