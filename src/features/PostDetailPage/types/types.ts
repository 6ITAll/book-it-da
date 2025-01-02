export interface Posting {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  book?: {
    title: string;
    author: string;
    itemId: number;
    imageUrl: string;
  };
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  isLiked: boolean;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}
