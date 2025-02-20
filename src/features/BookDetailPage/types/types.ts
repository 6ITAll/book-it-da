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

export interface DbBookPostCount {
  isbn: string;
  review_count: number;
  posting_count: number;
}

export interface DbReaderStats {
  isbn: string;
  total_collectors: number;
  demographics: {
    gender: {
      male: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      female: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      unknown: number;
    };
  };
}

export interface DbBookReviewStats {
  isbn: string;
  reviewer_count: number;
  average_rating: number;
}
