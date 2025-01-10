import { http, HttpResponse } from 'msw';

const reviews = [
  {
    itemId: '40869703',
    userId: 'testId',
    username: 'Lovely ChaeChae',
    date: '2024.08.01',
    content: '새롭네요!',
    likes: 3,
    rating: 4,
  },
  {
    itemId: '40869703',
    userId: 'test2Id',
    username: '독서왕난이',
    date: '2024.02.27',
    content: '도슨트북 새롭고 재미있어요',
    likes: 5,
    rating: 5,
  },
  {
    itemId: '40869703',
    userId: 'test3Id',
    username: '다비다나고양이',
    date: '2024.10.16',
    content: '책에 더 흥미를 갖게 도와주는 것 같아요',
    likes: 2,
    rating: 3,
  },
  {
    itemId: '40869703',
    userId: 'test4Id',
    username: '책벌레준이',
    date: '2024.09.15',
    content: '정말 좋은 책이에요.',
    likes: 4,
    rating: 5,
  },
  {
    itemId: '40869703',
    userId: 'test5Id',
    username: '책읽는요정',
    date: '2024.01.10',
    content: '이 책은 정말 감동적이었어요!',
    likes: 6,
    rating: 5,
  },
  {
    itemId: '40869703',
    userId: 'test6Id',
    username: '감성독서러',
    date: '2024.03.12',
    content: '읽으면서 많은 깨달음을 얻었습니다.',
    likes: 4,
    rating: 4,
  },
  {
    itemId: '40869703',
    userId: 'test7Id',
    username: '독서초보',
    date: '2024.05.08',
    content: '처음 읽는 책인데 너무 좋았어요.',
    likes: 1,
    rating: 3,
  },
  {
    itemId: '40869703',
    userId: 'test8Id',
    username: '책덕후',
    date: '2024.07.20',
    content: '강력 추천합니다!',
    likes: 7,
    rating: 5,
  },
  {
    itemId: '40869703',
    userId: 'test9Id',
    username: '리뷰왕',
    date: '2024.06.25',
    content: '리뷰를 안 쓸 수가 없을 만큼 좋은 책이에요.',
    likes: 8,
    rating: 5,
  },
  {
    itemId: '40869703',
    userId: 'test10Id',
    username: '독서러버',
    date: '2024.04.18',
    content: '책을 통해 많은 것을 배웠습니다.',
    likes: 3,
    rating: 4,
  },
  {
    itemId: '278770576',
    userId: 'test11Id',
    username: '독서시러시러',
    date: '2024.05.12',
    content: '너무 좋은 책입니다.',
    likes: 9,
    rating: 4,
  },
];
export const reviewHandlers = [
  // 최상위 3개 리뷰 반환
  http.get('/api/reviews/top/:itemId', ({ params }) => {
    const { itemId } = params;
    const filteredReviews = reviews.filter(
      (review) => review.itemId === itemId,
    );
    const totalReviews = filteredReviews.length;
    if (filteredReviews.length === 0) {
      return HttpResponse.json([], { status: 200 });
    }
    const topReviews = filteredReviews
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);
    return HttpResponse.json({ totalReviews, topReviews }, { status: 200 });
  }),

  // 페이지네이션 기반 모든 리뷰
  http.get('/api/reviews/:itemId', ({ params, request }) => {
    const { itemId } = params;
    const url = new URL(request.url); // 문자열 URL을 URL 객체로 변환
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = 5; // 한 페이지당 리뷰 수

    const filteredReviews = reviews.filter(
      (review) => review.itemId === itemId,
    );
    const totalReviews = filteredReviews.length;
    const startIndex = (page - 1) * limit;
    const paginatedReviews = filteredReviews.slice(
      startIndex,
      startIndex + limit,
    );

    return HttpResponse.json(
      { reviews: paginatedReviews, totalReviews },
      { status: 200 },
    );
  }),
];
