import { User } from '@features/user/types';

export interface SignupData
  extends Omit<
    User,
    'avatarUrl' | 'isFollowing' | 'isFollower' | 'userStats' | 'about'
  > {
  email: string;
  confirmPassword: string;
}
