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
