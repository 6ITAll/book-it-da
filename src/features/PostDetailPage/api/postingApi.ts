import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { Posting } from '@shared/types/type';
import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js';
import { OtherPost } from '../types/types';

interface SupabasePostingResponse {
  id: string;
  created_at: string;
  isbn: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  posting: {
    title: string;
    content: string;
  };
}

interface SupabaseBookOtherPostsResponse {
  id: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  isbn: string;
  posting: {
    title: string;
    content: string;
  };
  post_like: {
    user_id: string;
  }[];
  like_count: number;
}

export const postingApi = createApi({
  reducerPath: 'postingApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPostById: builder.query<Posting & { isUserOwnsPost: boolean }, string>({
      queryFn: async (postId) => {
        try {
          // 세션 정보 먼저 가져오기
          const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();

          if (sessionError) {
            console.error('세션 조회 실패:', sessionError);
            throw sessionError;
          }

          // 포스팅 데이터 가져오기
          const { data, error } = (await supabase
            .from('post')
            .select(
              `
              id,
              created_at,
              user:user_id (
                id,
                username,
                avatar_url
              ),
              isbn,
              posting(title, content)
            `,
            )
            .eq('id', postId)
            .single()) as PostgrestSingleResponse<SupabasePostingResponse>;

          if (error) {
            return { error };
          }
          const posting: Posting = {
            id: data.id,
            createdAt: data.created_at,
            postType: '포스팅',
            title: data.posting.title || '',
            content: data.posting.content || '',
            user: {
              id: data.user.id,
              username: data.user.username || data.user.id,
              avatarUrl: data.user.avatar_url,
            },
            book: {
              isbn: data.isbn,
              title: '',
              author: '',
              imageUrl: '',
            },
          };

          // 사용자 소유 여부 확인
          const isUserOwnsPost = sessionData.session?.user.id === data.user.id;

          return {
            data: {
              ...posting,
              isUserOwnsPost,
            },
          };
        } catch (error) {
          console.error('포스팅 조회 실패:', error);
          return { error };
        }
      },
      providesTags: (result, _, postId) =>
        result ? [{ type: 'Post', id: postId }] : [],
    }),
    getBookOtherPosts: builder.query<
      OtherPost[],
      { isbn: string; currentPostingId: string }
    >({
      queryFn: async ({ isbn, currentPostingId }) => {
        try {
          const { data, error } = (await supabase
            .from('post_with_like_count')
            .select(
              `
                id,
                created_at,
                user:user_id (id, username, avatar_url),
                isbn,
                posting (title, content),
                post_like!post_id (user_id),
                like_count:post_like!post_id(count)
              `,
            )
            .eq('isbn', isbn)
            .neq('id', currentPostingId)
            .order('like_count', { ascending: false }) // 임시 집계 컬럼으로 정렬
            .order('created_at', { ascending: false })
            .limit(3)) as PostgrestResponse<SupabaseBookOtherPostsResponse>;

          if (error) throw error;

          const otherPosts: OtherPost[] = data.map((post) => ({
            id: post.id,
            title: post.posting.title,
            content: post.posting.content,
            createdAt: post.created_at,
            user: {
              id: post.user.id,
              username: post.user.username || post.user.id,
              avatarUrl: post.user.avatar_url,
            },
            isbn: post.isbn,
            likeCount: post.like_count,
          }));
          return { data: otherPosts };
        } catch (error) {
          console.error('다른 책 포스팅 조회 실패:', error);
          return { error };
        }
      },
    }),

    getUserOtherPosts: builder.query<
      OtherPost[],
      { userId: string; currentPostingId: string }
    >({
      queryFn: async ({ userId, currentPostingId }) => {
        try {
          const { data, error } = (await supabase
            .from('post_with_like_count')
            .select(
              `
                id,
                created_at,
                user:user_id (id, username, avatar_url),
                isbn,
                posting (title, content),
                post_like!post_id (user_id),
                like_count:post_like!post_id(count)
              `,
            )
            .eq('user_id', userId)
            .neq('id', currentPostingId)
            .order('like_count', { ascending: false }) // 임시 집계 컬럼으로 정렬
            .order('created_at', { ascending: false })
            .limit(3)) as PostgrestResponse<SupabaseBookOtherPostsResponse>;

          if (error) throw error;

          const otherPosts: OtherPost[] = data.map((post) => ({
            id: post.id,
            title: post.posting.title,
            content: post.posting.content,
            createdAt: post.created_at,
            user: {
              id: post.user.id,
              username: post.user.username || post.user.id,
              avatarUrl: post.user.avatar_url,
            },
            isbn: post.isbn,
            likeCount: post.like_count,
          }));

          return { data: otherPosts };
        } catch (error) {
          console.error('사용자의 다른 포스팅 조회 실패:', error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useGetBookOtherPostsQuery,
  useGetUserOtherPostsQuery,
} = postingApi;
