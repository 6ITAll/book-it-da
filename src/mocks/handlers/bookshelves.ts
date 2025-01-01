import { http, HttpResponse } from 'msw';
import { ReadingStatusType } from '@shared/types/type';

interface UpdateReadingStatusRequest {
  readingStatus: ReadingStatusType;
}

let mockBookshelfData = {
  books: [
    {
      id: 1,
      bookTitle: '소설의 첫 만남',
      author: '김작가',
      imageUrl: '/src/assets/images/sample1.jpg',
      bookshelfId: 2,
      savedAt: '2024-01-01T10:00:00Z',
      itemId: 123456,
      readingStatus: 'READING' as ReadingStatusType,
    },
    {
      id: 2,
      bookTitle: '시간의 흐름',
      author: '이시인',
      imageUrl: '/src/assets/images/sample2.jpg',
      bookshelfId: 2,
      savedAt: '2024-01-02T11:00:00Z',
      itemId: 123457,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 3,
      bookTitle: '철학의 즐거움',
      author: '박철학',
      imageUrl: '/src/assets/images/sample3.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-03T12:00:00Z',
      itemId: 123458,
      readingStatus: 'WISH' as ReadingStatusType,
    },
    {
      id: 4,
      bookTitle: '과학의 세계',
      author: '정과학',
      imageUrl: '/src/assets/images/sample4.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-04T13:00:00Z',
      itemId: 123459,
      readingStatus: 'COMPLETED' as ReadingStatusType,
    },
    {
      id: 5,
      bookTitle: '가을의 정원',
      author: '박정원',
      imageUrl: '/src/assets/images/sample5.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-05T14:00:00Z',
      itemId: 123460,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 6,
      bookTitle: '디자인의 기초',
      author: '이디자인',
      imageUrl: '/src/assets/images/sample6.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-06T15:00:00Z',
      itemId: 123461,
      readingStatus: 'READING' as ReadingStatusType,
    },
    {
      id: 7,
      bookTitle: '바다의 노래',
      author: '김해양',
      imageUrl: '/src/assets/images/sample7.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-07T16:00:00Z',
      itemId: 123462,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 8,
      bookTitle: '역사의 비밀',
      author: '정역사',
      imageUrl: '/src/assets/images/sample8.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-08T17:00:00Z',
      itemId: 123463,
      readingStatus: 'WISH' as ReadingStatusType,
    },
    {
      id: 9,
      bookTitle: '음악의 세계',
      author: '김음악',
      imageUrl: '/src/assets/images/sample9.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-09T18:00:00Z',
      itemId: 123464,
      readingStatus: 'COMPLETED' as ReadingStatusType,
    },
    {
      id: 10,
      bookTitle: '미술의 이해',
      author: '이미술',
      imageUrl: '/src/assets/images/sample10.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-10T19:00:00Z',
      itemId: 123465,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 11,
      bookTitle: '건축의 아름다움',
      author: '최건축',
      imageUrl: '/src/assets/images/sample1.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-11T20:00:00Z',
      itemId: 123466,
      readingStatus: 'READING' as ReadingStatusType,
    },
    {
      id: 12,
      bookTitle: '요리의 즐거움',
      author: '박요리',
      imageUrl: '/src/assets/images/sample2.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-12T21:00:00Z',
      itemId: 123467,
      readingStatus: 'WISH' as ReadingStatusType,
    },
    {
      id: 13,
      bookTitle: '춤추는 별들',
      author: '김우주',
      imageUrl: '/src/assets/images/sample3.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-13T22:00:00Z',
      itemId: 123468,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 14,
      bookTitle: '마음의 지도',
      author: '정심리',
      imageUrl: '/src/assets/images/sample4.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-14T23:00:00Z',
      itemId: 123469,
      readingStatus: 'COMPLETED' as ReadingStatusType,
    },
    {
      id: 15,
      bookTitle: '꿈의 해석',
      author: '이정신',
      imageUrl: '/src/assets/images/sample5.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-15T00:00:00Z',
      itemId: 123470,
      readingStatus: 'READING' as ReadingStatusType,
    },
    {
      id: 16,
      bookTitle: '숲의 속삭임',
      author: '박자연',
      imageUrl: '/src/assets/images/sample6.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-16T01:00:00Z',
      itemId: 123471,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 17,
      bookTitle: '도시의 밤',
      author: '김도시',
      imageUrl: '/src/assets/images/sample7.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-17T02:00:00Z',
      itemId: 123472,
      readingStatus: 'WISH' as ReadingStatusType,
    },
    {
      id: 18,
      bookTitle: '언어의 마법',
      author: '최언어',
      imageUrl: '/src/assets/images/sample8.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-18T03:00:00Z',
      itemId: 123473,
      readingStatus: 'COMPLETED' as ReadingStatusType,
    },
    {
      id: 19,
      bookTitle: '빛의 물리학',
      author: '정물리',
      imageUrl: '/src/assets/images/sample9.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-19T04:00:00Z',
      itemId: 123474,
      readingStatus: null as ReadingStatusType,
    },
    {
      id: 20,
      bookTitle: '아침의 기적',
      author: '이새벽',
      imageUrl: '/src/assets/images/sample10.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-20T05:00:00Z',
      itemId: 123475,
      readingStatus: 'READING' as ReadingStatusType,
    },
  ],
  bookshelfName: '내 책장',
  totalCount: 20,
};

// 책장별 이름 매핑
const bookshelfNames: Record<number, string> = {
  1: '읽고 싶은 책',
  2: '읽은 책',
};

export const bookshelvesHandlers = [
  // 책장 조회
  http.get('/api/users/:userId/bookshelves/:bookshelfId', ({ params }) => {
    const { bookshelfId } = params;

    // bookshelfId에 해당하는 책들만 필터링
    const filteredBooks = mockBookshelfData.books.filter(
      (book) => book.bookshelfId === Number(bookshelfId),
    );

    return HttpResponse.json({
      books: filteredBooks,
      bookshelfName: bookshelfNames[Number(bookshelfId)] || '내 책장',
      totalCount: filteredBooks.length,
    });
  }),

  // 독서 상태 업데이트
  http.patch(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:bookId/status',
    async ({ params, request }) => {
      const { bookId } = params;
      const { readingStatus } =
        (await request.json()) as UpdateReadingStatusRequest;

      // mock 데이터 업데이트
      mockBookshelfData = {
        ...mockBookshelfData,
        books: mockBookshelfData.books.map((book) =>
          book.id === Number(bookId) ? { ...book, readingStatus } : book,
        ),
      };

      return HttpResponse.json({
        message: 'Reading status updated successfully',
        book: mockBookshelfData.books.find(
          (book) => book.id === Number(bookId),
        ),
      });
    },
  ),
];
