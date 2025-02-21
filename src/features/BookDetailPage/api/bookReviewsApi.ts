import { OneLineReview } from '@components/BookDetailPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { DbOneLineReview } from '../types/types';

export const bookReviewsApi = createApi({
  reducerPath: 'bookReviewsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookReviews'],
  endpoints: (builder) => ({
    getAllBookReviews: builder.query<
      OneLineReview[],
      { isbn: string; page: number; limit: number }
    >({
      async queryFn({ isbn, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('isbn_all_reviews')
            .select('*')
            .eq('isbn', isbn)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          if (error) throw error;

          const reviews: OneLineReview[] = (data as DbOneLineReview[]).map(
            (review) => ({
              postId: review.post_id,
              review: review.review,
              rating: review.rating,
              book: review.book,
              createdAt: review.created_at,
              user: {
                id: review.user.id,
                username: review.user.username,
                avatarUrl: review.user.avatar_url,
              },
            }),
          );

          return { data: reviews };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { isbn }) => [
        { type: 'BookReviews', id: `BookAllReviews-${isbn}` },
      ],
    }),
  }),
});

export const { useGetAllBookReviewsQuery } = bookReviewsApi;
