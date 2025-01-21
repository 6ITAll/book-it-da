import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType, FeedType, OneLinePost, Posting } from '@shared/types/type';

export interface FeedState {
  posts: (OneLinePost | Posting)[];
  page: number;
  postType: PostType;
  feedType: FeedType;
  hasMore: boolean;
  totalCount: number;
}

const initialState: FeedState = {
  posts: [],
  page: 1,
  postType: '선택안함',
  feedType: '추천',
  hasMore: true,
  totalCount: 0,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<(OneLinePost | Posting)[]>) => {
      state.posts = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPostType: (state, action: PayloadAction<PostType>) => {
      state.postType = action.payload;
    },
    setFeedType: (state, action: PayloadAction<FeedType>) => {
      state.feedType = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    updateFollowStatus: (
      state,
      action: PayloadAction<{ userId: number; isFollowing: boolean }>,
    ) => {
      state.posts.forEach((post) => {
        if (post.user.userId === action.payload.userId) {
          post.user.isFollowing = action.payload.isFollowing;
        }
      });
    },
    updateLikeStatus: (
      state,
      action: PayloadAction<{ postId: number; isLiked: boolean }>,
    ) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId,
      );
      if (post) {
        post.isLiked = action.payload.isLiked;
        post.likeCount = action.payload.isLiked
          ? post.likeCount + 1
          : post.likeCount - 1;
      }
    },
  },
});

export const {
  setPosts,
  setPage,
  setPostType,
  setFeedType,
  setHasMore,
  setTotalCount,
  updateFollowStatus,
  updateLikeStatus,
} = feedSlice.actions;

export default feedSlice.reducer;
