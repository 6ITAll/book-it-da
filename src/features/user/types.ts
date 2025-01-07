export interface User {
  name: string;
  userId: string;
  phone: string;
  password: string;
  gender: string;
  age: number;
  avatarUrl: string;
}

export type Account = Omit<User, 'gender' | 'age'>;
