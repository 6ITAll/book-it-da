export interface FollowRequest {
  userId: number;
  isFollowing: boolean;
}

export interface LikeRequest {
  postId: number;
  isLiked: boolean;
}
