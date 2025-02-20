import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import deleteUserFiles from '@utils/deleteUserFiles';
import { supabase } from '@utils/supabaseClient';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      async queryFn(userId) {
        try {
          const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('id', userId)
            .single();
          if (error) {
            return { error };
          }
          return { data };
        } catch (err) {
          return { error: { message: err } };
        }
      },
      providesTags: ['User'],
    }),
    updateField: builder.mutation({
      async queryFn({ userId, fieldName, value }) {
        try {
          const { error } = await supabase
            .from('user')
            .update({ [fieldName]: value })
            .eq('id', userId)
            .select();

          if (error) {
            console.error('Supabase update error:', error);
            return { error };
          }

          return { data: true };
        } catch (err) {
          console.error('Unknown error occurred during update:', err);
          return { error: { message: 'Unknown error occurred' } };
        }
      },
      invalidatesTags: ['User'],
    }),

    updateAvatar: builder.mutation({
      async queryFn({ userId, file }) {
        try {
          const filePath = `${userId}/${Date.now()}_${file.name}`;
          const { error } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

          if (error) {
            return { error };
          }

          const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
          if (!publicUrlData?.publicUrl) {
            return { error: { message: 'Failed to get public URL' } };
          }

          const { error: dbError } = await supabase
            .from('user')
            .update({ avatar_url: publicUrlData.publicUrl })
            .eq('id', userId);

          if (dbError) {
            return { error: dbError };
          }

          return { data: publicUrlData.publicUrl };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ['User'], // 캐시 무효화
    }),
    deleteAvatarFile: builder.mutation({
      async queryFn({ userId, avatarUrl }) {
        try {
          const oldAvatarPath = avatarUrl.split('/').slice(-2).join('/');
          const { error } = await supabase.storage
            .from('avatars')
            .remove([oldAvatarPath]);

          if (error) {
            return { error };
          }

          const { error: dbError } = await supabase
            .from('user')
            .update({ avatar_url: '' })
            .eq('id', userId);

          if (dbError) {
            return { error: dbError };
          }

          return { data: true };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ['User'], // 캐시 무효화
    }),
    deleteAccount: builder.mutation({
      async queryFn({ userId }) {
        try {
          // 스토리지 파일 삭제
          const filesDeleted = await deleteUserFiles(userId);
          if (!filesDeleted) {
            console.error('파일 삭제 실패');
            return { error: { message: '파일을 삭제하지 못했습니다.' } };
          }

          // user 테이블에서 유저 데이터 삭제
          const { error: userError } = await supabase
            .from('user')
            .delete()
            .eq('id', userId);

          if (userError) {
            console.error(
              'public.user 테이블에서 사용자 데이터 삭제 실패:',
              userError,
            );
            return {
              error: { message: '사용자 데이터를 삭제하지 못했습니다.' },
            };
          }
          return { data: true };
        } catch (err) {
          console.error('계정 삭제 중 알 수 없는 오류 발생:', err);
          return { error: { message: '알 수 없는 오류가 발생했습니다.' } };
        }
      },
      invalidatesTags: ['User'], // 캐시 무효화
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateFieldMutation,
  useUpdateAvatarMutation,
  useDeleteAvatarFileMutation,
  useDeleteAccountMutation,
} = userApi;
