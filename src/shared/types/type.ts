// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅';
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';

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
  avatar: string;
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
