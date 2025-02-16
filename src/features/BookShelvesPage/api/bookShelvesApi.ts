import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@utils/supabaseClient';
import { ReadingStatusType, SavedBook } from '@shared/types/type';
import {
  AddBookRequest,
  BookshelfBook,
  BookshelfWithLibrary,
  CreateBookshelfRequest,
  DeleteBookRequest,
  GetBookshelfResponse,
  GetBookshelvesResponse,
  ReadingStatus,
  UpdateReadingStatusRequest,
} from '../types/types';
import { libraryApi } from '@features/MyPage/api/libraryApi';
import { userProfileStatsApi } from '@features/MyPage/api/userProfileStatsApi';
import { readerStatsApi } from '@features/BookDetailPage/api/readerStatsApi';

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
          console.log(error);
          return { error: '책장 정보를 불러오는데 실패했습니다.' };
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
          console.log(error);
          return { error: '책 삭제에 실패했습니다.' };
        }
      },
      invalidatesTags: ['Bookshelf'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(libraryApi.util.invalidateTags(['Library']));
        } catch (error) {
          console.error('책 삭제 후 서재 업데이트 실패:', error);
        }
      },
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
          console.log(error);
          return { error: '독서상태 업데이트에 실패했습니다.' };
        }
      },
      invalidatesTags: ['Bookshelf', 'ReadingStatus'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            userProfileStatsApi.util.invalidateTags(['UserProfileStats']),
          );
        } catch (error) {
          console.error('독서 상태 수정 후 유저 프로필 업데이트 실패:', error);
        }
      },
    }),
    getBookshelves: builder.query<GetBookshelvesResponse, string>({
      queryFn: async (userId) => {
        try {
          const { data: libraryData, error: libraryError } = await supabase
            .from('library')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (libraryError) throw libraryError;

          const { data: bookshelves, error } = await supabase
            .from('bookshelf')
            .select('id, name')
            .eq('library_id', libraryData.id)
            .order('created_at', { ascending: true });

          if (error) throw error;

          return {
            data: {
              bookshelves,
            },
          };
        } catch (error) {
          console.log(error);
          return { error: '책장 목록을 불러오는데 실패했습니다.' };
        }
      },
      providesTags: ['Bookshelf'],
    }),

    createBookshelf: builder.mutation<string, CreateBookshelfRequest>({
      queryFn: async ({ userId, name }) => {
        try {
          const { data: libraryData, error: libraryError } = await supabase
            .from('library')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (libraryError) throw libraryError;

          const { data, error } = await supabase
            .from('bookshelf')
            .insert({
              library_id: libraryData.id,
              name,
              is_default: false,
            })
            .select('id')
            .single();

          if (error) throw error;

          return { data: data.id };
        } catch (error) {
          console.log(error);
          return { error: '책장 생성에 실패했습니다.' };
        }
      },
      invalidatesTags: ['Bookshelf'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(libraryApi.util.invalidateTags(['Library']));
        } catch (error) {
          console.error('책장 생성 후 서재 업데이트 실패:', error);
        }
      },
    }),

    addBook: builder.mutation<void, AddBookRequest>({
      queryFn: async ({ bookshelfId, isbn }) => {
        try {
          const { error } = await supabase.from('bookshelf_books').insert({
            bookshelf_id: bookshelfId,
            isbn,
          });

          if (error) throw error;

          return { data: undefined };
        } catch (error) {
          console.log(error);
          return { error: '책 추가에 실패했습니다.' };
        }
      },
      invalidatesTags: ['Bookshelf'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            readerStatsApi.util.invalidateTags(['BookReaderStats']),
          );
          await dispatch(libraryApi.util.invalidateTags(['Library']));
        } catch (error) {
          console.error('책 담기 후 서재 업데이트 실패:', error);
        }
      },
    }),
  }),
});

export const {
  useGetBookshelfQuery,
  useDeleteBookMutation,
  useUpdateReadingStatusMutation,
  useGetBookshelvesQuery,
  useCreateBookshelfMutation,
  useAddBookMutation,
} = bookShelvesApi;
