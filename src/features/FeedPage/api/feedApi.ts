import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FollowRequest,
  GetPostsParams,
  LikeRequest,
  PostsResponse,
} from '../types/types';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts'] as const,
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, GetPostsParams>({
      query: ({ page, postType, feedType, limit = 10 }) => ({
        url: '/posts',
        params: {
          page,
          postType,
          feedType,
          limit,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.feedType}-${queryArgs.postType}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        return {
          ...currentCache,
          posts: [...currentCache.posts, ...newItems.posts],
          hasMore: newItems.hasMore,
          totalCount: newItems.totalCount,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return true;
        return (
          currentArg?.page !== previousArg.page ||
          currentArg?.feedType !== previousArg.feedType ||
          currentArg?.postType !== previousArg.postType
        );
      },
      providesTags: ['Posts'],
    }),
    toggleFollow: builder.mutation<{ success: boolean }, FollowRequest>({
      query: ({ userId, isFollowing }) => ({
        url: '/follow',
        method: 'POST',
        body: { userId, isFollowing },
      }),
      // 팔로우/언팔로우 시 Posts 태그를 무효화하여 다음 탭 전환 시 새로운 데이터를 가져오도록 함
      invalidatesTags: ['Posts'],
      async onQueryStarted(
        { userId, isFollowing },
        { dispatch, queryFulfilled },
      ) {
        const feedTypes = ['추천', '팔로워', '팔로잉'] as const;

        const patchResults = feedTypes.map((feedType) =>
          dispatch(
            feedApi.util.updateQueryData(
              'getPosts',
              {
                page: 1,
                feedType,
                postType: undefined,
                limit: 10,
              } as GetPostsParams,
              (draft) => {
                draft.posts = draft.posts.map((post) => {
                  if (post.user.userId === userId) {
                    return { ...post, isFollowing };
                  }
                  return post;
                });
                return draft;
              },
            ),
          ),
        );

        try {
          const result = await queryFulfilled;
          if (!result.data.success) {
            patchResults.forEach((patchResult) => patchResult.undo());
          }
        } catch {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
    }),
    toggleLike: builder.mutation<{ success: boolean }, LikeRequest>({
      query: ({ postId, isLiked }) => ({
        url: '/like',
        method: 'POST',
        body: { postId, isLiked },
      }),
      async onQueryStarted({ postId, isLiked }, { dispatch, queryFulfilled }) {
        const feedTypes = ['추천', '팔로워', '팔로잉'] as const;

        const patchResults = feedTypes.map((feedType) =>
          dispatch(
            feedApi.util.updateQueryData(
              'getPosts',
              {
                page: 1,
                feedType,
                postType: undefined,
                limit: 10,
              } as GetPostsParams,
              (draft) => {
                draft.posts = draft.posts.map((post) => {
                  if (post.id === postId) {
                    return {
                      ...post,
                      isLiked,
                      likeCount: isLiked
                        ? post.likeCount + 1
                        : post.likeCount - 1,
                    };
                  }
                  return post;
                });
                return draft;
              },
            ),
          ),
        );

        try {
          const result = await queryFulfilled;
          if (!result.data.success) {
            patchResults.forEach((patchResult) => patchResult.undo());
          }
        } catch {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useToggleFollowMutation,
  useToggleLikeMutation,
} = feedApi;
