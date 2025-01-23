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

export const libraryHandlers = [
  http.get('/api/library/*', () => {
    return HttpResponse.json(
      [
        {
          id: 1,
          name: 'My Favorite',
          bookCount: 2,
          books: [
            {
              bookTitle: 'Book A',
              author: 'Author A',
              imageUrl: sample1,
              isbn: '101',
            },
            {
              bookTitle: 'Book B',
              author: 'Author B',
              imageUrl: sample2,
              isbn: '102',
            },
          ],
        },
        {
          id: 2,
          name: '눈물',
          bookCount: 3,
          books: [
            {
              bookTitle: 'Book C',
              author: 'Author C',
              imageUrl: sample3,
              isbn: '201',
            },
            {
              bookTitle: 'Book D',
              author: 'Author D',
              imageUrl: sample4,
              isbn: '202',
            },
            {
              bookTitle: 'Book E',
              author: 'Author E',
              imageUrl: sample5,
              isbn: '203',
            },
          ],
        },
        {
          id: 3,
          name: '미래의 도전',
          bookCount: 4,
          books: [
            {
              bookTitle: 'Book F',
              author: 'Author F',
              imageUrl: sample6,
              isbn: '301',
            },
            {
              bookTitle: 'Book G',
              author: 'Author G',
              imageUrl: sample7,
              isbn: '302',
            },
            {
              bookTitle: 'Book H',
              author: 'Author H',
              imageUrl: sample8,
              isbn: '303',
            },
            {
              bookTitle: 'Book I',
              author: 'Author I',
              imageUrl: sample9,
              isbn: '304',
            },
          ],
        },
      ],
      {
        status: 200,
      },
    );
  }),
];
