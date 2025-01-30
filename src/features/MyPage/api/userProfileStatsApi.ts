import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export const userProfileStatsApi = createApi({
  reducerPath: 'userProfileStatsApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserProfileStats: builder.query({
      queryFn: async (username: string) => {
        try {
          const { data, error } = await supabase
            .from('user_profile_stats')
            .select('*')
            .eq('user_username', username)
            .single();

          if (error) {
            return { error };
          }

          return { data };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useGetUserProfileStatsQuery } = userProfileStatsApi;
