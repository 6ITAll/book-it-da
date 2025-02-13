import { User } from '@shared/types/type';

export interface OtherPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
  isbn: string;
  likeCount: number;
}

// 댓글 타입
export interface DbComment {
  id: string;
  created_at: string;
  updated_at: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  is_edited: boolean;
  is_deleted: boolean;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  likes_count: number;
  likes: string[]; // 뷰에서 제공하는 좋아요한 사용자 ID 배열
}

export interface DbCommentCount {
  post_id: string;
  total_comments_count: number;
}

// 프론트엔드 타입 (카멜 케이스)
export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  content: string;
  parentId: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  likesCount: number;
  likes: string[]; // 좋아요한 사용자 ID 배열
  isLiked: boolean;
}

export interface CommentCount {
  postId: string;
  commentsCount: number;
}
