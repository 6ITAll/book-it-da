import { ReadingStatusType } from '@shared/types/type';
import { http, HttpResponse } from 'msw';

const mockBookshelf = {
  bookshelfId: 1,
  bookshelfName: '내 책장',
  books: [
    {
      itemId: 107413605,
      bookTitle: '금각사',
      author: '미시마 유키오',
      imageUrl: '/src/assets/images/sample1.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-01T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 337633173,
      bookTitle: '여행의 이유',
      author: '김영하',
      imageUrl: '/src/assets/images/sample2.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-02T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 347978053,
      bookTitle: '참을 수 없는 존재의 가벼움',
      author: '밀란 쿤데라',
      imageUrl: '/src/assets/images/sample3.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-03T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 303079837,
      bookTitle: '눈먼 자들의 도시',
      author: '주제 사라마구',
      imageUrl: '/src/assets/images/sample4.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-04T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 192003166,
      bookTitle: '밤의 사색',
      author: '헤르만 헤세',
      imageUrl: '/src/assets/images/sample5.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-05T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 4785218,
      bookTitle: '보통의 존재',
      author: '이석원',
      imageUrl: '/src/assets/images/sample6.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-06T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 280910486,
      bookTitle: '모국어는 차라리 침묵',
      author: '목정원',
      imageUrl: '/src/assets/images/sample7.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-07T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 33606,
      bookTitle: '구토',
      author: '장 폴 사르트르',
      imageUrl: '/src/assets/images/sample8.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-08T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 243698085,
      bookTitle: '시와 산책',
      author: '한정원',
      imageUrl: '/src/assets/images/sample9.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-09T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 251278195,
      bookTitle: '봄눈',
      author: '미시마 유키오',
      imageUrl: '/src/assets/images/sample10.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-10T10:00:00Z',
      readingStatus: 'WISH',
    },
  ],
  totalCount: 20,
};

export const bookshelvesHandlers = [
  // 책장 조회
  http.get('/api/users/:userId/bookshelves/:bookshelfId', () => {
    return HttpResponse.json(mockBookshelf);
  }),

  // 독서 상태 업데이트
  http.patch(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:itemId/status',
    async ({ params, request }) => {
      const { itemId } = params;
      const body = (await request.json()) as {
        readingStatus: ReadingStatusType;
      };
      const { readingStatus } = body;

      mockBookshelf.books = mockBookshelf.books.map((book) =>
        book.itemId === Number(itemId) ? { ...book, readingStatus } : book,
      );

      return HttpResponse.json({
        message: 'Reading status updated successfully',
      });
    },
  ),

  http.delete(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:itemId',
    ({ params }) => {
      const { itemId } = params;

      mockBookshelf.books = mockBookshelf.books.filter(
        (book) => book.itemId !== Number(itemId),
      );
      mockBookshelf.totalCount = mockBookshelf.books.length;

      return HttpResponse.json({
        message: 'Book deleted successfully',
      });
    },
  ),
];
