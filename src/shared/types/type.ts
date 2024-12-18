// 공통 Type 정의

// 게시물 interface
export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  userName: string;
  timeAgo: string;
  postType: string;
}
