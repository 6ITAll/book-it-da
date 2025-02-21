import { BookReviewStats } from '@components/BookDetailPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { DbBookReviewStats } from '../types/types';

export const reviewStatsApi = createApi({
  reducerPath: 'reviewStatsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['ReviewStats'],
  endpoints: (builder) => ({
    getBookReviewStats: builder.query<BookReviewStats, { isbn: string }>({
      async queryFn({ isbn }) {
        try {
          const { data, error } = await supabase
            .from('book_review_stats')
            .select('*')
            .eq('isbn', isbn)
            .single();

          if (error) throw error;

          const stats = data as DbBookReviewStats;
          return {
            data: {
              isbn: stats.isbn,
              reviewerCount: stats.reviewer_count,
              averageRating: stats.average_rating,
            },
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { isbn }) => [{ type: 'ReviewStats', id: isbn }],
    }),
  }),
});

export const { useGetBookReviewStatsQuery } = reviewStatsApi;
