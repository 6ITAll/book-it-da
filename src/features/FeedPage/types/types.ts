import { Post, PostType, FeedType } from '@shared/types/type';

export interface GetPostsParams {
  page: number;
  postType?: PostType;
  feedType: FeedType;
  limit?: number;
}

export interface PostsResponse {
  posts: Post[];
  hasMore: boolean;
  totalCount: number;
}
