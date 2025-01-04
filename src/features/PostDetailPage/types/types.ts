import { Book, User } from '@shared/types/type';

export interface OtherPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  book: Book;
  likeCount: number;
}
