import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface DbBookReviewStats {
  isbn: string;
  reviewer_count: number;
  average_rating: number;
}

export interface BookReviewStats {
  isbn: string;
  reviewerCount: number;
  averageRating: number;
}

export const bookDetailInfoApi = createApi({
  reducerPath: 'bookDetailInfoApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookReviewStats'],
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
          console.log(stats);
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
      providesTags: (_, __, { isbn }) => [
        { type: 'BookReviewStats', id: isbn },
      ],
    }),
  }),
});

export const { useGetBookReviewStatsQuery } = bookDetailInfoApi;
