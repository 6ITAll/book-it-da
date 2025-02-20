import { Book, Bookshelf } from '@components/MyPage/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/Supabase/supabaseClient';

export const libraryApi = createApi({
  reducerPath: 'libraryApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Library'],
  endpoints: (builder) => ({
    getLibrary: builder.query<Bookshelf[], string>({
      queryFn: async (userId) => {
        try {
          const { data: libraryData, error: libraryError } = await supabase
            .from('library')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (libraryError || !libraryData) {
            console.error('Error fetching library:', libraryError);
            return { error: { status: 404, data: 'Library not found' } };
          }

          const libraryId = libraryData.id;

          const { data: bookshelfData, error: bookshelfError } = await supabase
            .from('bookshelf_with_books')
            .select('*')
            .eq('library_id', libraryId);

          if (bookshelfError) {
            console.error('Error fetching bookshelves:', bookshelfError);
            return { error: { status: 500, data: bookshelfError.message } };
          }

          if (!bookshelfData || bookshelfData.length === 0) {
            return { data: [] };
          }

          const bookshelves = bookshelfData.map((shelf) => ({
            id: shelf.bookshelf_id,
            name: shelf.bookshelf_name,
            isDefault: shelf.is_default,
            bookCount: shelf.book_count,
            createdAt: shelf.bookshelf_created_at,
            updatedAt: shelf.bookshelf_updated_at,
            books: shelf.latest_books.map((book: Book) => ({
              isbn: book.isbn,
            })),
          }));

          return { data: bookshelves };
        } catch (err) {
          console.error('Error in getLibrary query:', err);
          return { error: { status: 500, data: (err as Error).message } };
        }
      },
      providesTags: ['Library'],
    }),
  }),
});

export const { useGetLibraryQuery } = libraryApi;
