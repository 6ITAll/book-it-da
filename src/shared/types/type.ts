// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅' | null;
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';
// 독서 상태 타입
export type ReadingStatusType = 'READING' | 'COMPLETED' | 'WISH' | null;

// 게시물 interface
export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: PostType;
  feedType: FeedType;
  bookTitle: string;
  bookAuthor: string;
}

// 책 interface
export interface Book {
  bookTitle: string;
  author: string;
  imageUrl: string;
  itemId: number;
}

export interface Bookshelf {
  id: number;
  name: string; // 책장 이름
  bookCount: number; // 책 개수
  books: Book[]; // 책 목록
}

// 저장된 책 interface
export interface SavedBook extends Book {
  id: number; // 저장된 책의 고유 ID
  bookshelfId: number; // 책장 ID
  savedAt: string; // 책장에 저장된 시간
  readingStatus: ReadingStatusType; // 독서 상태
}

// 책장 interface
export interface Bookshelf {
  id: number;
  name: string; // 사용자가 지정한 책장 이름
  createdAt: string;
  updatedAt: string;
  bookCount: number; // 책장에 저장된 책 수
}
