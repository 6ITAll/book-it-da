import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  PostingRequest,
  PostingResponse,
  UpdatePostingRequest,
} from '../types/types';
import { feedApi } from '@features/FeedPage/api/feedApi';

export const postingWriteApi = createApi({
  reducerPath: 'postingWriteApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Posts', 'SavedPostings'] as const,
  endpoints: (builder) => ({
    // 포스팅 작성
    createPosting: builder.mutation<PostingResponse, PostingRequest>({
      query: (body) => ({
        url: '/posts/posting',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts' }, { type: 'SavedPostings' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(feedApi.util.invalidateTags(['Posts']));
        } catch (error) {
          console.error('포스팅 작성 실패:', error);
        }
      },
    }),
    // 포스팅 수정
    updatePosting: builder.mutation<PostingResponse, UpdatePostingRequest>({
      query: ({ postingId, ...body }) => ({
        url: `/posts/posting/${postingId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Posts' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(feedApi.util.invalidateTags(['Posts']));
        } catch (error) {
          console.error('포스팅 수정 실패:', error);
        }
      },
    }),
    getSavedPostings: builder.query<PostingRequest[], void>({
      query: () => 'postings/saved',
      providesTags: ['SavedPostings'],
    }),
    savePosting: builder.mutation<PostingRequest, PostingRequest>({
      query: (posting) => ({
        url: 'postings/save',
        method: 'POST',
        body: posting,
      }),
      invalidatesTags: ['SavedPostings'],
    }),
    getSavedPosting: builder.query<PostingRequest, number>({
      query: (index) => `postings/saved/${index}`,
    }),
  }),
});

export const {
  useCreatePostingMutation,
  useUpdatePostingMutation,
  useGetSavedPostingsQuery,
  useSavePostingMutation,
  useGetSavedPostingQuery,
} = postingWriteApi;
