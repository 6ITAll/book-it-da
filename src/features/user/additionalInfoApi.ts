import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';

export const additionalInfoApi = createApi({
  reducerPath: 'additionalInfoApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      async queryFn({ userId, formData }) {
        try {
          const { error } = await supabase
            .from('user')
            .update({
              username: formData.userId,
              gender: formData.gender,
              birth_date: formData.birthDate,
            })
            .eq('id', userId);

          if (error) {
            return { error };
          }

          return { data: true };
        } catch (err) {
          return { error: { message: err } };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useUpdateUserInfoMutation } = additionalInfoApi;
