// 유저 정보 및 Stats

export interface UserInfo {
  id: string;
  name: string;
  avatarUrl: string;
  about: string;
}

export interface UserStat {
  count: number;
  label: string;
  isAction?: boolean;
  type?: 'followers' | 'followings';
}

export interface FollowListUser {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  isFollowing: boolean;
}

// 내 서재 탭

export interface Book {
  isbn: string;
}

export interface Bookshelf {
  id: string;
  name: string;
  isDefault: boolean;
  bookCount: number;
  createdAt: string;
  updatedAt: string;
  books: Book[];
}

// 내 피드 탭

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

export interface UserPostingReviewCounts {
  userId: string;
  totalPostingsCount: number;
  totalReviewsCount: number;
}

// 좋아요한 피드 탭
export interface UserLikedCountsResponse {
  userId: string;
  totalLikedPostingsCount: number;
  totalLikedReviewsCount: number;
}
