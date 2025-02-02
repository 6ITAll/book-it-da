import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { ReadingStatusType, SavedBook } from '@shared/types/type';
import {
  BookshelfBook,
  BookshelfWithLibrary,
  DeleteBookRequest,
  GetBookshelfResponse,
  ReadingStatus,
  UpdateReadingStatusRequest,
} from '../types/types';

export const bookShelvesApi = createApi({
  reducerPath: 'bookShelvesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Bookshelf', 'ReadingStatus'],
  endpoints: (builder) => ({
    getBookshelf: builder.query<GetBookshelfResponse, string>({
      queryFn: async (bookshelfId) => {
        if (!bookshelfId) {
          return { error: '책장 ID가 필요합니다.' };
        }

        try {
          const [bookshelfResponse, booksResponse] = await Promise.all([
            supabase
              .from('bookshelf')
              .select(
                `
                name,
                library:library_id (
                  user_id
                )
              `,
              )
              .eq('id', bookshelfId)
              .single<BookshelfWithLibrary>(),

            supabase
              .from('bookshelf_books')
              .select(
                `
                isbn,
                added_at
              `,
              )
              .eq('bookshelf_id', bookshelfId)
              .order('added_at', { ascending: false })
              .returns<BookshelfBook[]>(),
          ]);

          if (bookshelfResponse.error) throw bookshelfResponse.error;
          if (booksResponse.error) throw booksResponse.error;

          const { data: readingStatusData, error: readingStatusError } =
            await supabase
              .from('reading_status')
              .select('isbn, status')
              .eq('user_id', bookshelfResponse.data.library.user_id)
              .in(
                'isbn',
                booksResponse.data.map((book) => book.isbn),
              )
              .returns<ReadingStatus[]>();

          if (readingStatusError) throw readingStatusError;

          const readingStatusMap = new Map<string, ReadingStatusType>(
            readingStatusData.map((item) => [item.isbn, item.status]),
          );

          const books: SavedBook[] = booksResponse.data.map((item) => ({
            isbn: item.isbn,
            bookshelfId,
            addedAt: item.added_at,
            readingStatus: readingStatusMap.get(item.isbn) ?? null,
          }));

          return {
            data: {
              books,
              totalCount: books.length,
              bookshelfName: bookshelfResponse.data.name,
            },
          };
        } catch (error) {
          return { error: '책장 정보를 불러오는데 실패했습니다.' };
          console.log(error);
        }
      },
      providesTags: ['Bookshelf'],
    }),
    deleteBook: builder.mutation<void, DeleteBookRequest>({
      queryFn: async ({ bookshelfId, isbn }) => {
        if (!bookshelfId || !isbn) {
          return { error: '책장 ID와 ISBN이 필요합니다.' };
        }

        try {
          const { error } = await supabase
            .from('bookshelf_books')
            .delete()
            .match({
              bookshelf_id: bookshelfId,
              isbn: isbn,
            });

          if (error) throw error;

          return { data: undefined };
        } catch (error) {
          return { error: '책 삭제에 실패했습니다.' };
          console.log(error);
        }
      },
      invalidatesTags: ['Bookshelf'],
    }),
    updateReadingStatus: builder.mutation<void, UpdateReadingStatusRequest>({
      queryFn: async ({ userId, isbn, status }) => {
        try {
          const { error } = await supabase.from('reading_status').upsert(
            {
              user_id: userId,
              isbn,
              status,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id,isbn',
            },
          );

          if (error) throw error;

          return { data: undefined };
        } catch (error) {
          return { error: '독서상태 업데이트에 실패했습니다.' };
          console.log(error);
        }
      },
      invalidatesTags: ['Bookshelf', 'ReadingStatus'],
    }),
  }),
});

export const {
  useGetBookshelfQuery,
  useDeleteBookMutation,
  useUpdateReadingStatusMutation,
} = bookShelvesApi;
