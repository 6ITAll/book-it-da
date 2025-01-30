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
