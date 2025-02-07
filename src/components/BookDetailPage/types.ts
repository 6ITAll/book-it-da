// AddToLibraryDialog.tsx 인터페이스
export interface ResponseBookshelf {
  id: number;
  name: string;
}

// BookReviewTab.tsx 타입
export type MoreType = 'posts' | 'reviews';

// 책 상세 페이지 탭
export const BOOK_TABS = {
  INTRODUCE: '책 소개',
  FEED: '피드',
} as const;

export type BookTabType = (typeof BOOK_TABS)[keyof typeof BOOK_TABS];
