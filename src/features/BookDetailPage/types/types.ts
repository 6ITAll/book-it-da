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

export interface DbUserReview {
  id: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  one_line_review: {
    review: string;
    rating: number;
  };
  isbn: string;
}

export interface BookPostCount {
  isbn: string;
  review_count: number;
  posting_count: number;
}
