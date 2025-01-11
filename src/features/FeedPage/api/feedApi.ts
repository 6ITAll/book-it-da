import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPostsParams, PostsResponse } from '../types/types';

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
    }),
  }),
});

export const { useGetPostsQuery } = feedApi;
