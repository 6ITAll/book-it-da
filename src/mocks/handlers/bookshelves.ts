import { ReadingStatusType } from '@shared/types/type';
import { http, HttpResponse } from 'msw';

const mockBookshelf = {
  bookshelfId: 1,
  bookshelfName: '내 책장',
  books: [
    {
      itemId: 1,
      bookTitle: '1984',
      author: 'George Orwell',
      imageUrl: '/src/assets/images/sample1.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-01T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 2,
      bookTitle: 'Brave New World',
      author: 'Aldous Huxley',
      imageUrl: '/src/assets/images/sample2.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-02T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 3,
      bookTitle: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      imageUrl: '/src/assets/images/sample3.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-03T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 4,
      bookTitle: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      imageUrl: '/src/assets/images/sample4.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-04T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 5,
      bookTitle: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      imageUrl: '/src/assets/images/sample5.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-05T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 6,
      bookTitle: 'Pride and Prejudice',
      author: 'Jane Austen',
      imageUrl: '/src/assets/images/sample6.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-06T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 7,
      bookTitle: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      imageUrl: '/src/assets/images/sample7.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-07T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 8,
      bookTitle: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      imageUrl: '/src/assets/images/sample8.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-08T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 9,
      bookTitle: 'Animal Farm',
      author: 'George Orwell',
      imageUrl: '/src/assets/images/sample9.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-09T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 10,
      bookTitle: 'The Little Prince',
      author: 'Antoine de Saint-Exupéry',
      imageUrl: '/src/assets/images/sample10.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-10T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 11,
      bookTitle: 'Don Quixote',
      author: 'Miguel de Cervantes',
      imageUrl: '/src/assets/images/sample1.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-11T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 12,
      bookTitle: 'The Odyssey',
      author: 'Homer',
      imageUrl: '/src/assets/images/sample2.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-12T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 13,
      bookTitle: 'War and Peace',
      author: 'Leo Tolstoy',
      imageUrl: '/src/assets/images/sample3.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-13T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 14,
      bookTitle: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      imageUrl: '/src/assets/images/sample4.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-14T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 15,
      bookTitle: 'One Hundred Years of Solitude',
      author: 'Gabriel García Márquez',
      imageUrl: '/src/assets/images/sample5.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-15T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 16,
      bookTitle: 'The Divine Comedy',
      author: 'Dante Alighieri',
      imageUrl: '/src/assets/images/sample6.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-16T10:00:00Z',
      readingStatus: null,
    },
    {
      itemId: 17,
      bookTitle: 'Moby-Dick',
      author: 'Herman Melville',
      imageUrl: '/src/assets/images/sample7.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-17T10:00:00Z',
      readingStatus: 'READING',
    },
    {
      itemId: 18,
      bookTitle: 'The Brothers Karamazov',
      author: 'Fyodor Dostoevsky',
      imageUrl: '/src/assets/images/sample8.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-18T10:00:00Z',
      readingStatus: 'WISH',
    },
    {
      itemId: 19,
      bookTitle: 'Ulysses',
      author: 'James Joyce',
      imageUrl: '/src/assets/images/sample9.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-19T10:00:00Z',
      readingStatus: 'COMPLETED',
    },
    {
      itemId: 20,
      bookTitle: 'The Tale of Genji',
      author: 'Murasaki Shikibu',
      imageUrl: '/src/assets/images/sample10.jpg',
      bookshelfId: 1,
      savedAt: '2024-01-20T10:00:00Z',
      readingStatus: null,
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
