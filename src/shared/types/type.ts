// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅' | '선택안함';
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';
// 독서 상태 타입
export type ReadingStatusType = 'READING' | 'COMPLETED' | 'WISH' | null;

// 유저 인터페이스
export interface User {
  userId: number;
  userName: string;
  avatarUrl: string;
  isFollowing: boolean;
  isFollower: boolean;
}

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

// 게시물 interface
export interface Post {
  id: number;
  createdAt: string;
  user: User;
  book: Book;
  likeCount: number;
  isLiked: boolean;
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
  title: string;
  author: string;
  imageUrl: string;
}

export interface Bookshelf {
  id: number;
  name: string; // 책장 이름
  bookCount: number; // 책 개수
  books: Book[]; // 책 목록
}

// 저장된 책 interface
export interface SavedBook extends Book {
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

//마이페이지 팔로우, 팔로잉
export interface FollowRequest {
  userId: string;
  isFollowing: boolean;
}
