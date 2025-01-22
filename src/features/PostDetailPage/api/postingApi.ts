import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { Posting } from '@shared/types/type';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

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
  }),
});

export const { useGetPostByIdQuery } = postingApi;
