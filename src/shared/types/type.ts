// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅' | '선택안함';
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';
// 독서 상태 타입
export type ReadingStatusType = 'READING' | 'COMPLETED' | 'WISH' | null;

// 유저 인터페이스
export interface User {
  id: string;
  username?: string;
  name?: string;
  avatarUrl?: string;
  isFollowing?: boolean;
}

// 게시물 interface
export interface Post {
  id: string; // Supabase의 UUID
  createdAt: string; // 생성 날짜
  user: User;
  book: Book;
}

// 한줄평 포스트
export interface OneLinePost extends Post {
  postType: '한줄평';
  review: string;
  rating?: number;
}

// 일반 포스팅
export interface Posting extends Post {
  postType: '포스팅';
  title: string;
  content: string;
}

export interface SavedPosting {
  id: number;
  user_id: string;
  title: string | null;
  isbn: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
}

// 책 interface
export interface Book {
  isbn: string;
  title?: string;
  author?: string;
  imageUrl?: string;
}

// 저장된 책 interface
export interface SavedBook extends Book {
  bookshelfId: string; // 책장 ID
  addedAt: string; // 책장에 저장된 시간
  readingStatus: ReadingStatusType; // 독서 상태
}
