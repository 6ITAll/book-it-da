import { http, HttpResponse } from 'msw';

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
              imageUrl: 'src/assets/images/sample1.jpg',
              itemId: 101,
            },
            {
              bookTitle: 'Book B',
              author: 'Author B',
              imageUrl: 'src/assets/images/sample2.jpg',
              itemId: 102,
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
              imageUrl: 'src/assets/images/sample3.jpg',
              itemId: 201,
            },
            {
              bookTitle: 'Book D',
              author: 'Author D',
              imageUrl: 'src/assets/images/sample4.jpg',
              itemId: 202,
            },
            {
              bookTitle: 'Book E',
              author: 'Author E',
              imageUrl: 'src/assets/images/sample5.jpg',
              itemId: 203,
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
              imageUrl: 'src/assets/images/sample6.jpg',
              itemId: 301,
            },
            {
              bookTitle: 'Book G',
              author: 'Author G',
              imageUrl: 'src/assets/images/sample7.jpg',
              itemId: 302,
            },
            {
              bookTitle: 'Book H',
              author: 'Author H',
              imageUrl: 'src/assets/images/sample8.jpg',
              itemId: 303,
            },
            {
              bookTitle: 'Book I',
              author: 'Author I',
              imageUrl: 'src/assets/images/sample9.jpg',
              itemId: 304,
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
