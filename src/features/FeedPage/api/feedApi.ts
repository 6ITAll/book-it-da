import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FollowRequest,
  GetPostsParams,
  LikeRequest,
  PostsResponse,
} from '../types/types';
import { RootState } from '@store/index';
import { PostType } from '@shared/types/type';

const postTypes = ['한줄평', '포스팅', '선택안함'] as const;
const feedTypes = ['추천', '팔로워', '팔로잉'] as const;

const isValidPostType = (
  postType: PostType | undefined,
): postType is PostType => {
  return postType !== undefined && postTypes.includes(postType);
};

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
      // infinite 스크롤시 기존 데이터와 추가 데이터를 합침
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }
        const uniquePosts = [
          ...currentCache.posts,
          ...newItems.posts.filter(
            (newPost) =>
              !currentCache.posts.some((post) => post.id === newPost.id),
          ),
        ];
        return {
          ...currentCache,
          posts: uniquePosts,
          hasMore: newItems.hasMore,
          totalCount: newItems.totalCount,
        };
      },
      // 페이지 이동, 탭 전환시 데이터 강제 리페치
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
      invalidatesTags: [],
      async onQueryStarted(
        { userId, isFollowing },
        { dispatch, queryFulfilled, getState },
      ) {
        const state = getState() as RootState;
        const currentQueries = feedApi.util.selectInvalidatedBy(state, [
          'Posts',
        ]);

        const patchResults = currentQueries.flatMap(
          ({ endpointName, originalArgs }) => {
            if (endpointName === 'getPosts') {
              const typedArgs = originalArgs as GetPostsParams;
              if (
                feedTypes.includes(typedArgs.feedType) &&
                (isValidPostType(typedArgs.postType) ||
                  typedArgs.postType === undefined)
              ) {
                return dispatch(
                  feedApi.util.updateQueryData(
                    'getPosts',
                    typedArgs,
                    (draft) => {
                      draft.posts.forEach((post) => {
                        if (post.user.userId === userId) {
                          post.user.isFollowing = isFollowing;
                        }
                      });
                    },
                  ),
                );
              }
            }
            return [];
          },
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
      async onQueryStarted(
        { postId, isLiked },
        { dispatch, queryFulfilled, getState },
      ) {
        const state = getState() as RootState;
        const currentQueries = feedApi.util.selectInvalidatedBy(state, [
          'Posts',
        ]);

        const patchResults = currentQueries
          .map(({ endpointName, originalArgs }) => {
            if (endpointName === 'getPosts') {
              const typedArgs = originalArgs as GetPostsParams;
              return dispatch(
                feedApi.util.updateQueryData('getPosts', typedArgs, (draft) => {
                  const postToUpdate = draft.posts.find(
                    (post) => post.id === postId,
                  );
                  if (postToUpdate) {
                    postToUpdate.isLiked = isLiked;
                    postToUpdate.likeCount = isLiked
                      ? postToUpdate.likeCount + 1
                      : postToUpdate.likeCount - 1;
                  }
                }),
              );
            }
            return null;
          })
          .filter(Boolean);

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patchResult) => patchResult?.undo());
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
