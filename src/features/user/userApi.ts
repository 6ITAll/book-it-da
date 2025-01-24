import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(), // fakeBaseQuery 사용
  tagTypes: ['User'], // 캐싱 무효화를 위한 태그 설정
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
          console.log('Updating field:', fieldName, 'with value:', value);
          console.log('Updating user with ID:', userId);

          const { data, error } = await supabase
            .from('user')
            .update({ [fieldName]: value })
            .eq('id', userId)
            .select();

          if (error) {
            console.error('Supabase update error:', error);
            return { error };
          }

          console.log('Update successful:', data);
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

          return { data: publicUrlData.publicUrl }; // 성공적으로 반환된 URL
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

          return { data: true }; // 성공적으로 삭제됨
        } catch (err) {
          return { error: err };
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
} = userApi;
