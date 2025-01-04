import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OtherPost } from '../types/types';
import { Posting, User } from '@shared/types/type';

export const postingApi = createApi({
  reducerPath: 'postingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
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
  }),
});

export const {
  useGetPostByIdQuery,
  useGetCurrentUserQuery,
  useGetBookOtherPostsQuery,
  useGetUserOtherPostsQuery,
  useToggleLikeMutation,
} = postingApi;
