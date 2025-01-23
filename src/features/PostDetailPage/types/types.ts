export interface OtherPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  isbn: string;
  likeCount: number;
}
