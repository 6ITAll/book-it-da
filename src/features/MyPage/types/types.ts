// 팔로우 리스트
export interface DbFollowerData {
  follower_id: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
  };
}

export interface DbFollowingData {
  following_id: {
    id: string;
    username: string;
    name: string;
    avatar_url: string;
  };
}

// 내 피드 탭
export interface DbUserPostingReviewCounts {
  user_id: string;
  total_postings_count: number;
  total_reviews_count: number;
}

// 좋아요한 피드 탭
export interface DbUserLikedCounts {
  user_id: string;
  total_liked_postings_count: number;
  total_liked_reviews_count: number;
}

// 내 피드 탭 & 좋아요한 피드 탭
export interface DbOneLineReview {
  post_id: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

export interface DbPosting {
  post_id: string;
  title: string;
  content: string;
  book: {
    isbn: string;
  };
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}
