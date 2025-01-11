import { http, HttpResponse } from 'msw';
const mockAddToLibraryBookshelves: Array<{
  userId: string;
  id: number;
  name: string;
  books: AddBookPayload[];
}> = [
  { userId: 'test', id: 1, name: 'My Favorite', books: [] },
  { userId: 'test', id: 2, name: 'test의 책장', books: [] },
  { userId: 'test2', id: 3, name: '2024-12-22', books: [] },
];

interface BookLibraryData {
  itemId: number;
  libraryCount: number; // 서재 수
}

const mockBookLibraryData: BookLibraryData[] = [
  { itemId: 40869703, libraryCount: 192 },
  { itemId: 278770576, libraryCount: 132 },
  { itemId: 354729513, libraryCount: 100 },
];

interface Bookshelf {
  userId: string;
  id: number;
  name: string;
  books: AddBookPayload[];
}

interface AddBookPayload {
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

interface AddBookshelfPayload {
  name: string;
}

export const addToLibraryHandlers = [
  // 책장 조회
  http.get('/api/users/:userId/add-to-library/bookshelves', ({ params }) => {
    const { userId } = params as { userId: string };
    const userBookshelves = mockAddToLibraryBookshelves.filter(
      (bookshelf) => bookshelf.userId === userId,
    );
    return HttpResponse.json(userBookshelves);
  }),

  // 책장에 책 추가
  http.post(
    '/api/users/:userId/bookshelves/add-to-library/:id/books',
    async ({ params, request }) => {
      const { userId, id } = params as {
        userId: string;
        id: string;
      };

      const newBook = (await request.json()) as AddBookPayload;
      const targetBookshelf = mockAddToLibraryBookshelves.find(
        (shelf) => shelf.userId === userId && shelf.id === Number(id),
      );

      if (targetBookshelf) {
        targetBookshelf.books.push(newBook);
        return HttpResponse.json({
          message: '책이 성공적으로 추가 되었습니다.',
          book: newBook,
        });
      }

      return HttpResponse.json(
        { message: '책장을 찾을 수 없습니다.' },
        { status: 404 },
      );
    },
  ),

  // 책장 추가
  http.post(
    '/api/users/:userId/bookshelves/add-to-library',
    async ({ params, request }) => {
      const { userId } = params as { userId: string };
      const { name } = (await request.json()) as AddBookshelfPayload;

      const newBookshelfId =
        Math.max(...mockAddToLibraryBookshelves.map((shelf) => shelf.id)) + 1;

      const newBookshelf: Bookshelf = {
        userId,
        id: newBookshelfId,
        name,
        books: [],
      };

      mockAddToLibraryBookshelves.push(newBookshelf);

      return HttpResponse.json({
        message: '책장이 성공적으로 추가되었습니다.',
        bookshelf: newBookshelf,
      });
    },
  ),

  // 특정 책의 서재 수 조회
  http.get('/api/books/:itemId/library-count', ({ params }) => {
    const { itemId } = params as { itemId: string };

    // itemId를 숫자로 변환
    const numericItemId = Number(itemId);
    if (isNaN(numericItemId)) {
      return HttpResponse.json(
        { message: '유효하지 않은 itemId입니다.' },
        { status: 400 },
      );
    }

    // 데이터에서 해당 itemId를 가진 책 찾기
    const bookData = mockBookLibraryData.find(
      (book) => book.itemId === numericItemId,
    );

    // 데이터가 없을 경우 libraryCount 0으로 반환
    const response = bookData
      ? {
          itemId: bookData.itemId,
          libraryCount: bookData.libraryCount,
        }
      : {
          itemId: numericItemId,
          libraryCount: 0,
        };

    // 응답 반환
    return HttpResponse.json(response);
  }),
];
