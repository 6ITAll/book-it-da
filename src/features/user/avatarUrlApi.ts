import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';

export const avatarUrlApi = createApi({
  reducerPath: 'avatarUrlApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAvatarUrl: builder.query<string | null, string>({
      queryFn: async (userId) => {
        try {
          const { data, error } = await supabase
            .from('user')
            .select('avatar_url')
            .eq('id', userId)
            .single();

          if (error) throw error;

          return { data: data?.avatar_url };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAvatarUrlQuery } = avatarUrlApi;
