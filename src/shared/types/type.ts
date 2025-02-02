// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅' | '선택안함';
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';
// 독서 상태 타입
export type ReadingStatusType = 'READING' | 'COMPLETED' | 'WISH' | null;

// 책 상세페이지 포스트
export interface BookDetailPost {
  isbn: string;
  userId: string;
  title: string;
  description: string;
  userName: string;
  avatar: string;
  createdAt: string;
}

// 유저 인터페이스
export interface User {
  id: string;
  username?: string;
  avatarUrl?: string;
  isFollowing?: boolean;
  isFollower?: boolean;
}

// UserInfo 인터페이스 정의
export interface UserInfo {
  id: string;
  username: string;
  name: string;
  phone: string;
  gender: string;
  avatarUrl: string;
  about: string;
  age: number | null;
  email: string;
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

export interface Review {
  username: string;
  date: string;
  content: string;
  likes: number;
  rating: number;
  userId: string;
}

// 책 상세 페이지에 아바타에 필요한 userId 확장 타입
export interface ReviewCard extends Review {
  userId: string;
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

// 리뷰 데이터 타입
export interface Review {
  username: string;
  date: string;
  content: string;
  likes: number;
  rating: number;
}

// 책 상세페이지 성별 및 연령 데이터 타입
export interface GenderAge {
  age: string;
  male: number;
  female: number;
}
