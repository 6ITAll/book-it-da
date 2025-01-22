import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  PostingRequest,
  PostingResponse,
  UpdatePostingRequest,
} from '../types/types';
import { supabase } from '@utils/supabaseClient';
import { feedApi } from '@features/FeedPage/api/feedApi';
import { FeedType, PostType } from '@shared/types/type';

export const postingWriteApi = createApi({
  reducerPath: 'postingWriteApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Posts', 'SavedPostings'] as const,
  endpoints: (builder) => ({
    createPosting: builder.mutation<PostingResponse, PostingRequest>({
      queryFn: async (body) => {
        try {
          const { data: session } = await supabase.auth.getSession();
          if (!session) {
            return { error: { status: 401, data: 'Not authenticated' } };
          }

          const userId = session.session?.user.id;

          const { data: postData, error: postError } = await supabase
            .from('post')
            .insert({
              user_id: userId,
              isbn: body.book.isbn,
            })
            .select()
            .single();

          if (postError) throw postError;

          const { data: postingData, error: postingError } = await supabase
            .from('posting')
            .insert({
              post_id: postData.id,
              title: body.title,
              content: body.content,
            })
            .select()
            .single();

          if (postingError) throw postingError;

          return { data: { ...postData, ...postingData } };
        } catch (error) {
          console.error('포스팅 작성 실패:', error);
          return { error: { status: 500, data: 'Failed to create posting' } };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(feedApi.util.invalidateTags(['Posts']));
          const feedTypes: FeedType[] = ['추천', '팔로잉', '팔로워'];
          const postTypes: PostType[] = ['선택안함', '한줄평', '포스팅'];
          for (const feedType of feedTypes) {
            for (const postType of postTypes) {
              await dispatch(
                feedApi.endpoints.getPosts.initiate(
                  { page: 1, feedType, postType },
                  { forceRefetch: true },
                ),
              );
            }
          }
        } catch (error) {
          console.error('포스팅 작성 후 피드 업데이트 실패:', error);
        }
      },
    }),
    updatePosting: builder.mutation<PostingResponse, UpdatePostingRequest>({
      queryFn: async ({ postingId, ...body }) => {
        try {
          const { data: session } = await supabase.auth.getSession();
          if (!session) {
            return { error: { status: 401, data: 'Not authenticated' } };
          }

          const { data: postData, error: postError } = await supabase
            .from('post')
            .update({ isbn: body.book.isbn })
            .eq('id', postingId)
            .select()
            .single();

          if (postError) throw postError;

          const { data: postingData, error: postingError } = await supabase
            .from('posting')
            .update({
              title: body.title,
              content: body.content,
            })
            .eq('post_id', postingId)
            .select()
            .single();

          if (postingError) throw postingError;

          return { data: { ...postData, ...postingData } };
        } catch (error) {
          console.error('포스팅 수정 실패:', error);
          return { error: { status: 500, data: 'Failed to update posting' } };
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(feedApi.util.invalidateTags(['Posts']));
          const feedTypes: FeedType[] = ['추천', '팔로잉', '팔로워'];
          const postTypes: PostType[] = ['선택안함', '한줄평', '포스팅'];
          for (const feedType of feedTypes) {
            for (const postType of postTypes) {
              await dispatch(
                feedApi.endpoints.getPosts.initiate(
                  { page: 1, feedType, postType },
                  { forceRefetch: true },
                ),
              );
            }
          }
        } catch (error) {
          console.error('포스팅 수정 후 피드 업데이트 실패:', error);
        }
      },
    }),
  }),
});

export const { useCreatePostingMutation, useUpdatePostingMutation } =
  postingWriteApi;
