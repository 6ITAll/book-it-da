// 유저 정보 및 Stats

export interface UserInfo {
  userId: string;
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
  userId: string;
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
  post_id: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  created_at: string;
  like_count: number;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export interface Posting {
  post_id: string;
  title: string;
  content: string;
  book: {
    isbn: string;
  };
  created_at: string;
  like_count: number;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}
