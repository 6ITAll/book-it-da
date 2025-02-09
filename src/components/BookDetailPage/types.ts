// BookReviewTab.tsx 타입
export type MoreType = 'postings' | 'reviews';

// 책 상세 페이지 탭
export const BOOK_TABS = {
  INTRODUCE: '책 소개',
  FEED: '피드',
} as const;

export type BookTabType = (typeof BOOK_TABS)[keyof typeof BOOK_TABS];

export interface UserReview {
  postId: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}

export interface OneLineReview {
  postId: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}

export interface Posting {
  postId: string;
  title: string;
  content: string;
  book: {
    isbn: string;
  };
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}
