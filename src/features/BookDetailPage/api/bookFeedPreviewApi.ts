import { OneLineReview, Posting } from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';
import { DbBookPostCount, DbOneLineReview, DbPosting } from '../types/types';

export const bookFeedPreviewApi = createApi({
  reducerPath: 'bookFeedPreviewApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookFeedPreview'],
  endpoints: (builder) => ({
    getLatestBookReviews: builder.query<OneLineReview[], { isbn: string }>({
      async queryFn({ isbn }) {
        try {
          const { data, error } = await supabase
            .from('latest_isbn_reviews')
            .select('*')
            .eq('isbn', isbn);

          if (error) throw error;

          const dbReviews = data[0]?.latest_reviews || [];
          const reviews: OneLineReview[] = dbReviews.map(
            (review: DbOneLineReview) => ({
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
        { type: 'BookFeedPreview', id: `OneLineReviews-${isbn}` },
      ],
    }),

    getLatestBookPostings: builder.query<Posting[], { isbn: string }>({
      async queryFn({ isbn }) {
        try {
          const { data, error } = await supabase
            .from('latest_isbn_postings')
            .select('*')
            .eq('isbn', isbn);

          if (error) throw error;

          const dbPostings = data[0]?.latest_postings || [];
          const postings: Posting[] = dbPostings.map((posting: DbPosting) => ({
            postId: posting.post_id,
            title: posting.title,
            content: posting.content,
            book: posting.book,
            createdAt: posting.created_at,
            user: {
              id: posting.user.id,
              username: posting.user.username,
              avatarUrl: posting.user.avatar_url,
            },
          }));

          return { data: postings };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { isbn }) => [
        { type: 'BookFeedPreview', id: `Postings-${isbn}` },
      ],
    }),
    getBookPostCount: builder.query<DbBookPostCount, { isbn: string }>({
      async queryFn({ isbn }) {
        try {
          const { data, error } = await supabase
            .from('book_post_count')
            .select('*')
            .eq('isbn', isbn)
            .single();

          if (error) throw error;

          const postCount: DbBookPostCount = {
            isbn: data.isbn,
            review_count: data.review_count,
            posting_count: data.posting_count,
          };

          return { data: postCount };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_, __, { isbn }) => [
        { type: 'BookFeedPreview', id: `PostCount-${isbn}` },
      ],
    }),
  }),
});

export const {
  useGetLatestBookReviewsQuery,
  useGetLatestBookPostingsQuery,
  useGetBookPostCountQuery,
} = bookFeedPreviewApi;
