import { PostType, OneLinePost, Posting, FeedType } from '@shared/types/type';

export interface GetPostsParams {
  page: number;
  postType?: PostType;
  feedType: FeedType;
  limit?: number;
}

export interface PostsResponse {
  posts: (OneLinePost | Posting)[];
  hasMore: boolean;
  totalCount: number;
}

export interface FollowRequest {
  userId: number;
  isFollowing: boolean;
}
