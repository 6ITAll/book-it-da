import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OtherPost } from '../types/types';
import { Posting, User } from '@shared/types/type';
import { FollowRequest } from '@features/FeedPage/types/types';

export const postingApi = createApi({
  reducerPath: 'postingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPostById: builder.query<Posting, string>({
      query: (postId) => `/posts/${postId}`,
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
    }),
    getBookOtherPosts: builder.query<OtherPost[], number>({
      query: (bookId) => `/books/${bookId}/posts`,
    }),
    getUserOtherPosts: builder.query<OtherPost[], number>({
      query: (userId) => `/users/${userId}/posts`,
    }),
    toggleLike: builder.mutation<
      { isLiked: boolean; likeCount: number },
      number
    >({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: 'POST',
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            postingApi.util.updateQueryData(
              'getPostById',
              postId.toString(),
              (draft) => {
                draft.isLiked = data.isLiked;
                draft.likeCount = data.likeCount;
              },
            ),
          );
        } catch (error) {
          console.error('좋아요 실패했습니다:', error);
        }
      },
    }),
    toggleFollow: builder.mutation<User, FollowRequest>({
      query: ({ userId, isFollowing }) => ({
        url: `/users/${userId}/follow`,
        method: 'POST',
        body: { isFollowing },
      }),
      async onQueryStarted(
        { userId, isFollowing },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          postingApi.util.updateQueryData(
            'getPostById',
            userId.toString(),
            (draft) => {
              if (draft.user.userId === userId) {
                draft.user.isFollowing = isFollowing;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useGetCurrentUserQuery,
  useGetBookOtherPostsQuery,
  useGetUserOtherPostsQuery,
  useToggleLikeMutation,
  useToggleFollowMutation,
} = postingApi;
