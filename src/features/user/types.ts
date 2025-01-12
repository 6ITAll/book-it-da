export interface User {
  name: string;
  userId: string;
  phone: string;
  password: string;
  gender: string;
  age: number;
  avatarUrl: string;
  isFollowing: boolean;
  isFollower: boolean;
  userStats?: UserStat[];
  about: string;
}

export interface UserStat {
  count: number;
  label: string;
  isAction?: boolean;
}

export type Account = Omit<User, 'gender' | 'age'> & {
  userStats: UserStat[];
  about: string;
};
