import { OneLineReview } from '@components/BookDetailPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';

export interface DbOneLineReview {
  post_id: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

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

          console.log(data);
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
          console.log(reviews);

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
