import { http, HttpResponse } from 'msw';

const reviews = [
  {
    itemId: '40869703',
    username: 'Lovely ChaeChae',
    date: '2024.08.01',
    content: '새롭네요!',
    likes: 3,
    rating: 4,
  },
  {
    itemId: '40869703',
    username: '독서왕난이',
    date: '2024.02.27',
    content: '도슨트북 새롭고 재미있어요',
    likes: 5,
    rating: 5,
  },
  {
    itemId: '40869703',
    username: '다비다나고양이',
    date: '2024.10.16',
    content: '책에 더 흥미를 갖게 도와주는 것 같아요',
    likes: 2,
    rating: 3,
  },
  {
    itemId: '40869703',
    username: '책벌레준이',
    date: '2024.09.15',
    content: '정말 좋은 책이에요.',
    likes: 4,
    rating: 5,
  },
  {
    itemId: '40869703',
    username: '책읽는요정',
    date: '2024.01.10',
    content: '이 책은 정말 감동적이었어요!',
    likes: 6,
    rating: 5,
  },
  {
    itemId: '40869703',
    username: '감성독서러',
    date: '2024.03.12',
    content: '읽으면서 많은 깨달음을 얻었습니다.',
    likes: 4,
    rating: 4,
  },
  {
    itemId: '40869703',
    username: '독서초보',
    date: '2024.05.08',
    content: '처음 읽는 책인데 너무 좋았어요.',
    likes: 1,
    rating: 3,
  },
  {
    itemId: '40869703',
    username: '책덕후',
    date: '2024.07.20',
    content: '강력 추천합니다!',
    likes: 7,
    rating: 5,
  },
  {
    itemId: '40869703',
    username: '리뷰왕',
    date: '2024.06.25',
    content: '리뷰를 안 쓸 수가 없을 만큼 좋은 책이에요.',
    likes: 8,
    rating: 5,
  },
  {
    itemId: '40869703',
    username: '독서러버',
    date: '2024.04.18',
    content: '책을 통해 많은 것을 배웠습니다.',
    likes: 3,
    rating: 4,
  },
  {
    itemId: '278770576',
    username: '독서시러시러',
    date: '2024.05.12',
    content: '너무 좋은 책입니다.',
    likes: 9,
    rating: 4,
  },
];
export const reviewHandlers = [
  http.get('/api/reviews/:itemId', ({ params }) => {
    const { itemId } = params;

    const filteredReviews = reviews.filter(
      (review) => review.itemId === itemId,
    );

    if (filteredReviews.length === 0) {
      return HttpResponse.json([], { status: 200 });
    }

    const topReviews = filteredReviews
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);

    return HttpResponse.json(topReviews, { status: 200 });
  }),
];
