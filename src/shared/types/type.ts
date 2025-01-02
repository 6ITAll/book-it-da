// 공통 Type 정의

// Post Type
export type PostType = '한줄평' | '포스팅';
// Feed Type
export type FeedType = '추천' | '팔로워' | '팔로잉';

// 게시물 interface
export interface Post {
  id: number;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  createdAt: string;
  postType: PostType;
  isFollowing: boolean;
  isFollower: boolean;
  bookTitle: string;
  bookAuthor: string;
}

// 한줄평 포스트
export interface OneLinePost extends Post {
  postType: '한줄평';
  review: string;
}

// 일반 포스팅
export interface Posting extends Post {
  postType: '포스팅';
  title: string;
  description: string;
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
