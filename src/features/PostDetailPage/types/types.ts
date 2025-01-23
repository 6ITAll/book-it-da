import { User } from '@shared/types/type';

export interface OtherPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  isbn: string;
  likeCount: number;
}
