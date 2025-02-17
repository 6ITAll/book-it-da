import { Posting } from '@components/BookDetailPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { DbPosting } from '../types/types';

export const bookPostingsApi = createApi({
  reducerPath: 'bookPostingsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['BookPostings'],
  endpoints: (builder) => ({
    getAllBookPostings: builder.query<
      Posting[],
      { isbn: string; page: number; limit: number }
    >({
      async queryFn({ isbn, page, limit }) {
        try {
          const offset = (page - 1) * limit;

          const { data, error } = await supabase
            .from('isbn_all_postings')
            .select('*')
            .eq('isbn', isbn)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

          if (error) throw error;

          const postings: Posting[] = (data as DbPosting[]).map((posting) => ({
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
        { type: 'BookPostings', id: `BookAllPostings-${isbn}` },
      ],
    }),
  }),
});

export const { useGetAllBookPostingsQuery } = bookPostingsApi;
