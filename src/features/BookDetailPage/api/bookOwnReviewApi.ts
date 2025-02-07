import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '@utils/supabaseClient';

export interface DbUserReview {
  id: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  one_line_review: {
    review: string;
    rating: number;
  };
  isbn: string;
}

export interface UserReview {
  postId: string;
  review: string;
  rating: number | null;
  book: {
    isbn: string;
  };
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
}

export const bookOwnReviewApi = createApi({
  reducerPath: 'bookOwnReviewApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookOwnReview'],
  endpoints: (builder) => ({
    getBookOwnReview: builder.query<
      UserReview | null,
      { userId: string; isbn: string }
    >({
      queryFn: async ({ userId, isbn }) => {
        try {
          const { data, error } = (await supabase
            .from('post')
            .select(
              `
              id,
              created_at,
              isbn,
              user:user_id (id, username, avatar_url),
              one_line_review!inner (review, rating)
            `,
            )
            .eq('user_id', userId)
            .eq('isbn', isbn)
            .limit(1)
            .single()) as PostgrestSingleResponse<DbUserReview>;

          console.log('Query params:', userId, isbn);
          console.log('Raw data:', data);

          if (error) throw error;
          console.log(error);
          if (!data) return { data: null };

          const transformedReview: UserReview = {
            postId: data.id,
            review: data.one_line_review.review,
            rating: data.one_line_review.rating,
            book: {
              isbn: data.isbn,
            },
            createdAt: data.created_at,
            user: {
              id: data.user.id,
              username: data.user.username,
              avatarUrl: data.user.avatar_url,
            },
          };

          return { data: transformedReview };
        } catch (error) {
          // 직렬화 가능한 에러 객체로 변환
          return {
            error: {
              message: error instanceof Error ? error.message : 'Unknown error',
              name: error instanceof Error ? error.name : 'Error',
            },
          };
        }
      },
      providesTags: (_, __, { userId, isbn }) => [
        { type: 'BookOwnReview', id: `${userId}-${isbn}` },
      ],
    }),
  }),
});

export const { useGetBookOwnReviewQuery } = bookOwnReviewApi;
