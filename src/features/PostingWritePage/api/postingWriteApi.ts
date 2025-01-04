import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostingRequest, PostingResponse } from '../types/types';
import { feedApi } from '@features/FeedPage/api/feedApi';

export const postingWriteApi = createApi({
  reducerPath: 'postingWriteApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts'] as const,
  endpoints: (builder) => ({
    createPosting: builder.mutation<PostingResponse, PostingRequest>({
      query: (body) => ({
        url: '/posts/posting',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(feedApi.util.invalidateTags(['Posts']));
        } catch (error) {
          console.error('포스팅 작성 실패:', error);
        }
      },
    }),
  }),
});

export const { useCreatePostingMutation } = postingWriteApi;
