import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';
import { DbComment, DbCommentCount, Comment } from '../types/types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Comments', 'CommentCount', 'CommentLike'],
  endpoints: (builder) => ({
    // 댓글 조회
    getComments: builder.query<
      Comment[],
      { postId: string; page: number; limit: number }
    >({
      async queryFn({ postId, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = (await supabase
            .from('posting_comment_with_likes')
            .select(
              `
          *,
          user:user_id (
            id,
            username,
            avatar_url
          )
        `,
            )
            .eq('post_id', postId)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)) as PostgrestResponse<DbComment>;

          if (error) throw error;

          const comments: Comment[] = (data as DbComment[]).map((comment) => ({
            id: comment.id,
            createdAt: comment.created_at,
            updatedAt: comment.updated_at,
            postId: comment.post_id,
            userId: comment.user_id,
            content: comment.content,
            parentId: comment.parent_id,
            isEdited: comment.is_edited,
            user: {
              id: comment.user.id,
              username: comment.user.username,
              avatarUrl: comment.user.avatar_url,
            },
            likesCount: comment.likes_count || 0,
            likes: comment.likes || [],
            isLiked: false,
          }));

          return { data: comments };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { postId }) => [
        { type: 'Comments', id: `Comments-${postId}` },
      ],
    }),

    // 댓글 생성
    createComment: builder.mutation<
      Comment,
      { postId: string; content: string; userId: string; parentId?: string }
    >({
      async queryFn({ postId, content, userId, parentId }) {
        try {
          const { data, error } = await supabase
            .from('posting_comment')
            .insert({
              post_id: postId,
              content,
              parent_id: parentId || null,
              user_id: userId,
            })
            .select(
              `
          *,
          user:user_id (
            id,
            username,
            avatar_url
          )
        `,
            )
            .single();

          if (error) throw error;

          const comment = data as DbComment;
          return {
            data: {
              id: comment.id,
              createdAt: comment.created_at,
              updatedAt: comment.updated_at,
              postId: comment.post_id,
              userId: comment.user_id,
              content: comment.content,
              parentId: comment.parent_id,
              isEdited: comment.is_edited,
              user: {
                id: comment.user.id,
                username: comment.user.username,
                avatarUrl: comment.user.avatar_url,
              },
              likesCount: comment.likes_count || 0,
              likes: comment.likes || [],
              isLiked: false,
            },
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_, __, { postId }) => [
        { type: 'Comments', id: `Comments-${postId}` },
      ],
    }),

    // 댓글 수정
    updateComment: builder.mutation<
      void,
      { commentId: string; content: string; postId: string }
    >({
      async queryFn({ commentId, content }) {
        try {
          const { error } = await supabase
            .from('posting_comment')
            .update({
              content,
              is_edited: true,
              updated_at: new Date().toISOString(),
            })
            .eq('id', commentId);

          if (error) throw error;
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_, __, { postId }) => [
        { type: 'Comments', id: `Comments-${postId}` },
      ],
    }),
    // 댓글 삭제
    deleteComment: builder.mutation<
      void,
      { commentId: string; postId: string }
    >({
      async queryFn({ commentId }) {
        try {
          const { error } = await supabase
            .from('posting_comment')
            .delete()
            .eq('id', commentId);

          if (error) throw error;
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_, __, { postId }) => [
        { type: 'Comments', id: postId },
        { type: 'CommentCount', id: postId },
      ],
    }),

    // 좋아요 토글
    toggleCommentLike: builder.mutation<
      void,
      { commentId: string; postId: string }
    >({
      async queryFn({ commentId }) {
        try {
          const { error } = await supabase.rpc('toggle_comment_like', {
            p_comment_id: commentId,
          });

          if (error) throw error;
          return { data: undefined };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (_, __, { postId }) => [
        { type: 'Comments', id: `Comments-${postId}` },
      ],
    }),

    // 댓글 개수 조회
    getCommentCount: builder.query<number, { postId: string }>({
      async queryFn({ postId }) {
        try {
          const { data, error } = await supabase
            .from('posting_comment_counts')
            .select('*')
            .eq('post_id', postId)
            .single();

          if (error) throw error;

          const count = data as DbCommentCount;
          return { data: count.comments_count };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { postId }) => [
        { type: 'CommentCount', id: postId },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
  useGetCommentCountQuery,
} = commentApi;
