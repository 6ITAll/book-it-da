import { Book, ReadingStatusType } from '@shared/types/type';
import { http, HttpResponse } from 'msw';
import sample1 from '@assets/images/sample1.jpg';
import sample2 from '@assets/images/sample2.jpg';
import sample3 from '@assets/images/sample3.jpg';
import sample4 from '@assets/images/sample4.jpg';
import sample5 from '@assets/images/sample5.jpg';
import sample6 from '@assets/images/sample6.jpg';
import sample7 from '@assets/images/sample7.jpg';
import sample8 from '@assets/images/sample8.jpg';
import sample9 from '@assets/images/sample9.jpg';
import sample10 from '@assets/images/sample10.jpg';

// 책 데이터
export const bookData: Book[] = [
  {
    title: '금각사',
    author: '미시마 유키오',
    imageUrl: sample1,
    isbn: '890121590X',
  },
  {
    title: '여행의 이유',
    author: '김영하',
    imageUrl: sample2,
    isbn: 'K312930064',
  },
  {
    title: '참을 수 없는 존재의 가벼움',
    author: '밀란 쿤데라',
    imageUrl: sample3,
    isbn: '8937437562',
  },
  {
    title: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: sample4,
    isbn: '8973374931',
  },
  {
    title: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: sample5,
    isbn: 'K092635900',
  },
  {
    title: '보통의 존재',
    author: '이석원',
    imageUrl: sample6,
    isbn: '8993928037',
  },
  {
    title: '모국어는 차라리 침묵',
    author: '목정원',
    imageUrl: sample7,
    isbn: 'K062734948',
  },
  {
    title: '구토',
    author: '장 폴 사르트르',
    imageUrl: sample8,
    isbn: '8931001835',
  },
  {
    title: '시와 산책',
    author: '한정원',
    imageUrl: sample9,
    isbn: 'K262630212',
  },
  {
    title: '봄눈',
    author: '미시마 유키오',
    imageUrl: sample10,
    isbn: '8937479834',
  },
];

// Mock 책장 데이터
const mockBookshelf = {
  bookshelfId: 1,
  bookshelfName: '내 책장',
  books: bookData.map((book, index) => ({
    ...book,
    bookshelfId: 1,
    savedAt: `2024-01-${String(index + 1).padStart(2, '0')}T10:00:00Z`,
    readingStatus:
      index % 3 === 0
        ? 'READING'
        : index % 3 === 1
          ? 'WISH'
          : index % 3 === 2
            ? 'COMPLETED'
            : null,
  })),
  totalCount: bookData.length,
};

export const bookshelvesHandlers = [
  // 책장 조회
  http.get('/api/users/:userId/bookshelves/:bookshelfId', () => {
    return HttpResponse.json(mockBookshelf);
  }),

  // 독서 상태 업데이트
  http.patch(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:isbn/status',
    async ({ params, request }) => {
      const { isbn } = params;
      const body = (await request.json()) as {
        readingStatus: ReadingStatusType;
      };
      const { readingStatus } = body;

      mockBookshelf.books = mockBookshelf.books.map((book) =>
        book.isbn === isbn ? { ...book, readingStatus } : book,
      );

      return HttpResponse.json({
        message: 'Reading status updated successfully',
      });
    },
  ),

  // 책 삭제
  http.delete(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:isbn',
    ({ params }) => {
      const { isbn } = params;

      mockBookshelf.books = mockBookshelf.books.filter(
        (book) => book.isbn !== isbn,
      );
      mockBookshelf.totalCount = mockBookshelf.books.length;

      return HttpResponse.json({
        message: 'Book deleted successfully',
      });
    },
  ),
];
