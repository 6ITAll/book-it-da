import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPostsParams, PostsResponse } from '../types/types';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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
    }),
  }),
});

export const { useGetPostsQuery } = feedApi;
