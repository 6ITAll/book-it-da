export interface DbPostingResponse {
  id: string;
  created_at: string;
  isbn: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  posting: {
    title: string;
    content: string;
  };
}

export interface DbBookOtherPostsResponse {
  id: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  isbn: string;
  posting: {
    title: string;
    content: string;
  };
  post_like: {
    user_id: string;
  }[];
  like_count: number;
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
  likes: string[];
}

export interface DbCommentCount {
  post_id: string;
  total_comments_count: number;
}
