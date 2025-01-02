import { http, HttpResponse } from 'msw';
import { ReadingStatusType, SavedBook } from '@shared/types/type';
import {
  BookInfo,
  UserBookStatus,
} from '@features/BookShelvesPage/types/types';

interface MockData {
  books: {
    [itemId: number]: BookInfo;
  };
  userBooks: {
    [userId: number]: {
      [itemId: number]: UserBookStatus;
    };
  };
}

const mockData: MockData = {
  books: {
    123456: {
      itemId: 123456,
      bookTitle: '소설의 첫 만남',
      author: '김작가',
      imageUrl: '/src/assets/images/sample1.jpg',
    },
    123457: {
      itemId: 123457,
      bookTitle: '시간의 흐름',
      author: '이시인',
      imageUrl: '/src/assets/images/sample2.jpg',
    },
    123458: {
      itemId: 123458,
      bookTitle: '철학의 즐거움',
      author: '박철학',
      imageUrl: '/src/assets/images/sample3.jpg',
    },
    123459: {
      itemId: 123459,
      bookTitle: '과학의 세계',
      author: '정과학',
      imageUrl: '/src/assets/images/sample4.jpg',
    },
    123460: {
      itemId: 123460,
      bookTitle: '가을의 정원',
      author: '박정원',
      imageUrl: '/src/assets/images/sample5.jpg',
    },
    123461: {
      itemId: 123461,
      bookTitle: '디자인의 기초',
      author: '이디자인',
      imageUrl: '/src/assets/images/sample6.jpg',
    },
    123462: {
      itemId: 123462,
      bookTitle: '바다의 노래',
      author: '김해양',
      imageUrl: '/src/assets/images/sample7.jpg',
    },
    123463: {
      itemId: 123463,
      bookTitle: '역사의 비밀',
      author: '정역사',
      imageUrl: '/src/assets/images/sample8.jpg',
    },
    123464: {
      itemId: 123464,
      bookTitle: '음악의 세계',
      author: '김음악',
      imageUrl: '/src/assets/images/sample9.jpg',
    },
    123465: {
      itemId: 123465,
      bookTitle: '미술의 이해',
      author: '이미술',
      imageUrl: '/src/assets/images/sample10.jpg',
    },
    123466: {
      itemId: 123466,
      bookTitle: '건축의 아름다움',
      author: '최건축',
      imageUrl: '/src/assets/images/sample1.jpg',
    },
    123467: {
      itemId: 123467,
      bookTitle: '요리의 즐거움',
      author: '박요리',
      imageUrl: '/src/assets/images/sample2.jpg',
    },
    123468: {
      itemId: 123468,
      bookTitle: '춤추는 별들',
      author: '김우주',
      imageUrl: '/src/assets/images/sample3.jpg',
    },
    123469: {
      itemId: 123469,
      bookTitle: '마음의 지도',
      author: '정심리',
      imageUrl: '/src/assets/images/sample4.jpg',
    },
    123470: {
      itemId: 123470,
      bookTitle: '꿈의 해석',
      author: '이정신',
      imageUrl: '/src/assets/images/sample5.jpg',
    },
    123471: {
      itemId: 123471,
      bookTitle: '숲의 속삭임',
      author: '박자연',
      imageUrl: '/src/assets/images/sample6.jpg',
    },
    123472: {
      itemId: 123472,
      bookTitle: '도시의 밤',
      author: '김도시',
      imageUrl: '/src/assets/images/sample7.jpg',
    },
    123473: {
      itemId: 123473,
      bookTitle: '언어의 마법',
      author: '최언어',
      imageUrl: '/src/assets/images/sample8.jpg',
    },
    123474: {
      itemId: 123474,
      bookTitle: '빛의 물리학',
      author: '정물리',
      imageUrl: '/src/assets/images/sample9.jpg',
    },
    123475: {
      itemId: 123475,
      bookTitle: '아침의 기적',
      author: '이새벽',
      imageUrl: '/src/assets/images/sample10.jpg',
    },
  },
  userBooks: {
    1: {
      // userId: 1
      123456: {
        id: 1,
        userId: 1,
        bookshelfId: 2,
        savedAt: '2024-01-01T10:00:00Z',
        readingStatus: 'READING',
      },
      123457: {
        id: 2,
        userId: 1,
        bookshelfId: 2,
        savedAt: '2024-01-02T11:00:00Z',
        readingStatus: null,
      },
      123458: {
        id: 3,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-03T12:00:00Z',
        readingStatus: 'WISH',
      },
      123459: {
        id: 4,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-04T13:00:00Z',
        readingStatus: 'COMPLETED',
      },
      123460: {
        id: 5,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-05T14:00:00Z',
        readingStatus: null,
      },
      123461: {
        id: 6,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-06T15:00:00Z',
        readingStatus: 'READING',
      },
      123462: {
        id: 7,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-07T16:00:00Z',
        readingStatus: null,
      },
      123463: {
        id: 8,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-08T17:00:00Z',
        readingStatus: 'WISH',
      },
      123464: {
        id: 9,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-09T18:00:00Z',
        readingStatus: 'COMPLETED',
      },
      123465: {
        id: 10,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-10T19:00:00Z',
        readingStatus: null,
      },
      123466: {
        id: 11,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-11T20:00:00Z',
        readingStatus: 'READING',
      },
      123467: {
        id: 12,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-12T21:00:00Z',
        readingStatus: 'WISH',
      },
      123468: {
        id: 13,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-13T22:00:00Z',
        readingStatus: null,
      },
      123469: {
        id: 14,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-14T23:00:00Z',
        readingStatus: 'COMPLETED',
      },
      123470: {
        id: 15,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-15T00:00:00Z',
        readingStatus: 'READING',
      },
      123471: {
        id: 16,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-16T01:00:00Z',
        readingStatus: null,
      },
      123472: {
        id: 17,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-17T02:00:00Z',
        readingStatus: 'WISH',
      },
      123473: {
        id: 18,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-18T03:00:00Z',
        readingStatus: 'COMPLETED',
      },
      123474: {
        id: 19,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-19T04:00:00Z',
        readingStatus: null,
      },
      123475: {
        id: 20,
        userId: 1,
        bookshelfId: 1,
        savedAt: '2024-01-20T05:00:00Z',
        readingStatus: 'READING',
      },
    },
  },
};

// 책장별 이름 매핑
const bookshelfNames: Record<number, string> = {
  1: '읽고 싶은 책',
  2: '읽은 책',
};

export const bookshelvesHandlers = [
  // 책장 조회
  http.get('/api/users/:userId/bookshelves/:bookshelfId', ({ params }) => {
    const { userId, bookshelfId } = params;
    const userBooks = mockData.userBooks[Number(userId)] || {};

    // BookInfo와 UserBookStatus를 SavedBook 형태로 변환
    const books: SavedBook[] = Object.entries(userBooks)
      .filter(([, status]) => status.bookshelfId === Number(bookshelfId))
      .map(([itemId, status]) => ({
        ...mockData.books[Number(itemId)], // Book 타입의 필드들
        id: status.id,
        bookshelfId: status.bookshelfId,
        savedAt: status.savedAt,
        readingStatus: status.readingStatus,
      }));

    return HttpResponse.json({
      books,
      bookshelfName: bookshelfNames[Number(bookshelfId)] || '내 책장',
      totalCount: books.length,
    });
  }),

  // 독서 상태 업데이트
  http.patch(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:bookId/status',
    async ({ params, request }) => {
      const { userId, bookId } = params;
      const { readingStatus } = (await request.json()) as {
        readingStatus: ReadingStatusType;
      };

      // 사용자의 책 상태 업데이트
      if (!mockData.userBooks[Number(userId)]) {
        mockData.userBooks[Number(userId)] = {};
      }

      mockData.userBooks[Number(userId)][Number(bookId)] = {
        ...mockData.userBooks[Number(userId)][Number(bookId)],
        readingStatus,
      };

      return HttpResponse.json({
        message: 'Reading status updated successfully',
        book: {
          ...mockData.books[Number(bookId)],
          ...mockData.userBooks[Number(userId)][Number(bookId)],
        },
      });
    },
  ),

  http.delete(
    '/api/users/:userId/bookshelves/:bookshelfId/books/:bookId',
    ({ params }) => {
      const { userId, bookId } = params;

      if (mockData.userBooks[Number(userId)]) {
        delete mockData.userBooks[Number(userId)][Number(bookId)];
      }

      return HttpResponse.json({
        message: 'Book deleted successfully',
      });
    },
  ),
];
