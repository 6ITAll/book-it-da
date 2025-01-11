/** AddToLibraryApi.ts 관련 타입 */
import { BookInfo } from '@features/BookShelvesPage/types/types';

// 책장 데이터 타입
export interface Bookshelf {
  id: number;
  name: string;
  books: BookInfo[];
}

// 책 추가 요청에 사용되는 데이터 타입
export interface AddBookPayload {
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

/** postApi.ts에 관련 타입 */
import { BookDetailPost } from '@shared/types/type';

// 포스트 응답 데이터 타입
export interface PostResponse {
  totalPosts: number;
  topPosts: BookDetailPost[];
}

/** reviewApi.ts 관련 타입 */
import { Review } from '@shared/types/type';

export interface ReviewResponse {
  totalReviews: number;
  topReviews: Review[];
}

export interface PaginatedReviewResponse {
  reviews: Review[];
}
