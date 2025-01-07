import { Book, OneLinePost } from '@shared/types/type';

export interface OneLineReviewRequest {
  book: Book;
  rating: number;
  review: string;
}

export interface OneLineReviewResponse {
  success: boolean;
  message?: string;
  post?: OneLinePost;
}
