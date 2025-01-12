import { http, HttpResponse } from 'msw';

const posts = [
  {
    itemId: '40869703',
    userId: 'testId',
    title: '추천 도서 소개',
    description: '제가 좋아하는 책을 소개합니다.',
    userName: '독서연구소',
    avatar: '/path/to/avatar1.jpg',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test2Id',
    title: '독서의 즐거움',
    description: '독서를 통해 얻는 지식과 행복에 대해 이야기합니다.',
    userName: '책사랑',
    avatar: '/path/to/avatar2.jpg',
    createdAt: '2024-01-02T11:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test3Id',
    title: '2024년 독서 계획',
    description: '올해는 이 책들과 함께 즐거운 독서를 해보려 합니다.',
    userName: '책벌레',
    avatar: '/path/to/avatar3.jpg',
    createdAt: '2024-01-03T12:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test4Id',
    title: '책으로 떠나는 여행',
    description: '책에서 만나는 다양한 세계를 공유합니다.',
    userName: '책여행자',
    avatar: '/path/to/avatar4.jpg',
    createdAt: '2023-12-31T15:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test5Id',
    title: '추천 도서 목록',
    description: '제가 추천하는 도서 목록을 확인해보세요!',
    userName: '추천왕',
    avatar: '/path/to/avatar5.jpg',
    createdAt: '2023-12-30T14:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test6Id',
    title: '읽고 싶은 책',
    description: '다음에 꼭 읽고 싶은 책들을 소개합니다.',
    userName: '책수집가',
    avatar: '/path/to/avatar6.jpg',
    createdAt: '2023-12-29T13:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test7Id',
    title: '고전 문학의 매력',
    description: '고전 문학을 통해 느낄 수 있는 감동을 전합니다.',
    userName: '문학연구소',
    avatar: '/path/to/avatar7.jpg',
    createdAt: '2023-12-28T16:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test8Id',
    title: '독서 방법 공유',
    description: '효율적으로 책을 읽는 방법을 공유합니다.',
    userName: '효율적독서',
    avatar: '/path/to/avatar8.jpg',
    createdAt: '2023-12-27T17:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test9Id',
    title: '독서 기록',
    description: '제가 읽은 책에 대한 기록을 남깁니다.',
    userName: '기록자',
    avatar: '/path/to/avatar9.jpg',
    createdAt: '2023-12-26T18:00:00Z',
  },
  {
    itemId: '40869703',
    userId: 'test10Id',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    userId: 'test11Id',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    userId: 'test12Id',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
];

export const postHandlers = [
  http.get('/api/posts/book/top/:itemId', ({ params }) => {
    const { itemId } = params;
    const filteredPosts = posts.filter((post) => post.itemId === itemId);

    if (filteredPosts.length === 0) {
      return HttpResponse.json([], { status: 200 });
    }

    // 가장 최근 생성된 3개의 포스트 반환
    const recentPosts = filteredPosts
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 3);

    return HttpResponse.json(
      { totalPosts: filteredPosts.length, topPosts: recentPosts },
      { status: 200 },
    );
  }),

  // 페이지네이션 기반 모든 포스트 반환
  http.get('/api/posts/book/:itemId', ({ request, params }) => {
    const { itemId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = 10;

    const filteredPosts = posts.filter((post) => post.itemId === itemId);
    const start = (page - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(start, start + pageSize);

    return HttpResponse.json(
      { posts: paginatedPosts, totalPosts: filteredPosts.length },
      { status: 200 },
    );
  }),
];
