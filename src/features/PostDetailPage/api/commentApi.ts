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
            isDeleted: comment.is_deleted,
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
              isDeleted: comment.is_deleted,
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
        { type: 'CommentCount', id: postId },
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
      { isParentDeleted: boolean },
      { commentId: string; postId: string }
    >({
      async queryFn({ commentId }) {
        try {
          // 현재 댓글이 부모 댓글인지, 답글이 있는지 확인
          const { data: currentComment, error: commentError } = await supabase
            .from('posting_comment')
            .select('parent_id')
            .eq('id', commentId)
            .single();

          if (commentError) throw commentError;

          let isParentDeleted = false;

          // 부모 댓글인 경우
          if (!currentComment.parent_id) {
            // 답글이 있는지 확인
            const { count, error: countError } = await supabase
              .from('posting_comment')
              .select('*', { count: 'exact' })
              .eq('parent_id', commentId);

            if (countError) throw countError;

            const replyCount = count ?? 0;

            if (replyCount > 0) {
              // 답글이 있으면 is_deleted만 true로 설정
              const { error } = await supabase
                .from('posting_comment')
                .update({ is_deleted: true })
                .eq('id', commentId);

              if (error) throw error;
            } else {
              // 답글이 없으면 완전 삭제
              const { error } = await supabase
                .from('posting_comment')
                .delete()
                .eq('id', commentId);

              if (error) throw error;
            }
          } else {
            // 답글인 경우 삭제 처리
            const { error: deleteError } = await supabase
              .from('posting_comment')
              .delete()
              .eq('id', commentId);

            if (deleteError) throw deleteError;

            // 부모 댓글이 is_deleted=true인지 확인하고, 다른 답글이 있는지 확인
            const { data: parentComment, error: parentError } = await supabase
              .from('posting_comment')
              .select('is_deleted')
              .eq('id', currentComment.parent_id)
              .single();

            if (parentError) throw parentError;

            if (parentComment.is_deleted) {
              // 다른 답글이 있는지 확인
              const { count: remainingCount, error: countError } =
                await supabase
                  .from('posting_comment')
                  .select('*', { count: 'exact' })
                  .eq('parent_id', currentComment.parent_id);

              if (countError) throw countError;

              // 다른 답글이 없으면 부모 댓글도 삭제
              if ((remainingCount ?? 0) === 0) {
                const { error } = await supabase
                  .from('posting_comment')
                  .delete()
                  .eq('id', currentComment.parent_id);

                if (error) throw error;
                isParentDeleted = true;
              }
            }
          }

          return { data: { isParentDeleted } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, _, { postId }) => [
        { type: 'Comments' as const, id: postId },
        { type: 'CommentCount' as const, id: postId },
        // 부모 댓글도 삭제된 경우 추가로 무효화
        ...(result?.isParentDeleted
          ? [{ type: 'CommentCount' as const, id: postId }]
          : []),
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
          console.log(count);
          return { data: count.total_comments_count };
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
