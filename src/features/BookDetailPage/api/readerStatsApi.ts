import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface DbReaderStats {
  isbn: string;
  total_collectors: number;
  demographics: {
    gender: {
      male: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      female: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      unknown: number;
    };
  };
}

// 프론트엔드 사용 타입
export interface ReaderStats {
  isbn: string;
  totalCollectors: number;
  demographics: {
    gender: {
      male: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      female: {
        '10s': number;
        '20s': number;
        '30s': number;
        '40s': number;
        '50s': number;
        '60plus': number;
        unknown: number;
      };
      unknown: number;
    };
  };
}

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
