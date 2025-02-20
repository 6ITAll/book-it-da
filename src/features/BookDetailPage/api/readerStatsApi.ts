import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { DbReaderStats } from '../types/types';
import { ReaderStats } from '@components/BookDetailPage/types';

export const readerStatsApi = createApi({
  reducerPath: 'bookReaderStatsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookReaderStats'],
  endpoints: (builder) => ({
    getBookReaderStats: builder.query<ReaderStats, { isbn: string }>({
      async queryFn({ isbn }) {
        try {
          const { data, error } = await supabase
            .from('book_stats')
            .select('*')
            .eq('isbn', isbn)
            .single();

          if (error) throw error;

          const stats = data as DbReaderStats;
          return {
            data: {
              isbn: stats.isbn,
              totalCollectors: stats.total_collectors,
              demographics: stats.demographics, // JSON 구조는 그대로 유지
            },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { isbn }) => [
        { type: 'BookReaderStats', id: isbn },
      ],
    }),
  }),
});
export const { useGetBookReaderStatsQuery } = readerStatsApi;
