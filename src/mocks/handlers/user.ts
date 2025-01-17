import { http, HttpResponse } from 'msw';

const mockUser = {
  userId: 'user',
  name: '김구름',
  phone: '010-1234-5678',
  avatarUrl: 'https://github.com/publdaze.png',
};

const userPosts = [
  {
    itemId: '40869703',
    title: '추천 도서 소개',
    description: '제가 좋아하는 책을 소개합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar1.jpg',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서의 즐거움',
    description: '독서를 통해 얻는 지식과 행복에 대해 이야기합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar2.jpg',
    createdAt: '2024-01-02T11:00:00Z',
  },
  {
    itemId: '40869703',
    title: '2024년 독서 계획',
    description: '올해는 이 책들과 함께 즐거운 독서를 해보려 합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar3.jpg',
    createdAt: '2024-01-03T12:00:00Z',
  },
  {
    itemId: '40869703',
    title: '책으로 떠나는 여행',
    description: '책에서 만나는 다양한 세계를 공유합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar4.jpg',
    createdAt: '2023-12-31T15:00:00Z',
  },
  {
    itemId: '40869703',
    title: '추천 도서 목록',
    description: '제가 추천하는 도서 목록을 확인해보세요!',
    userName: '김구름',
    avatar: '/path/to/avatar5.jpg',
    createdAt: '2023-12-30T14:00:00Z',
  },
  {
    itemId: '40869703',
    title: '읽고 싶은 책',
    description: '다음에 꼭 읽고 싶은 책들을 소개합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar6.jpg',
    createdAt: '2023-12-29T13:00:00Z',
  },
  {
    itemId: '40869703',
    title: '고전 문학의 매력',
    description: '고전 문학을 통해 느낄 수 있는 감동을 전합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar7.jpg',
    createdAt: '2023-12-28T16:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서 방법 공유',
    description: '효율적으로 책을 읽는 방법을 공유합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar8.jpg',
    createdAt: '2023-12-27T17:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서 기록',
    description: '제가 읽은 책에 대한 기록을 남깁니다.',
    userName: '김구름',
    avatar: '/path/to/avatar9.jpg',
    createdAt: '2023-12-26T18:00:00Z',
  },
  {
    itemId: '40869703',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '김구름',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
];

const userReviews = [
  {
    username: '김독서',
    date: '2024.08.01',
    content: '새롭네요!',
    likes: 1,
    rating: 4, // 별점 추가
  },
  {
    username: '김독서',
    date: '2024.02.27',
    content: '도슨트북 새롭고 재미있어요',
    likes: 1,
    rating: 5, // 별점 추가
  },
  {
    username: '김독서',
    date: '2024.10.16',
    content: '책에 더 흥미를 갖게 도와주는 것 같아요',
    likes: 1,
    rating: 3, // 별점 추가
  },
];

const likedPosts = [
  {
    itemId: '40869703',
    title: '추천 도서 소개',
    description: '제가 좋아하는 책을 소개합니다.',
    userName: '독서연구소',
    avatar: '/path/to/avatar1.jpg',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서의 즐거움',
    description: '독서를 통해 얻는 지식과 행복에 대해 이야기합니다.',
    userName: '책사랑',
    avatar: '/path/to/avatar2.jpg',
    createdAt: '2024-01-02T11:00:00Z',
  },
  {
    itemId: '40869703',
    title: '2024년 독서 계획',
    description: '올해는 이 책들과 함께 즐거운 독서를 해보려 합니다.',
    userName: '책벌레',
    avatar: '/path/to/avatar3.jpg',
    createdAt: '2024-01-03T12:00:00Z',
  },
  {
    itemId: '40869703',
    title: '책으로 떠나는 여행',
    description: '책에서 만나는 다양한 세계를 공유합니다.',
    userName: '책여행자',
    avatar: '/path/to/avatar4.jpg',
    createdAt: '2023-12-31T15:00:00Z',
  },
  {
    itemId: '40869703',
    title: '추천 도서 목록',
    description: '제가 추천하는 도서 목록을 확인해보세요!',
    userName: '추천왕',
    avatar: '/path/to/avatar5.jpg',
    createdAt: '2023-12-30T14:00:00Z',
  },
  {
    itemId: '40869703',
    title: '읽고 싶은 책',
    description: '다음에 꼭 읽고 싶은 책들을 소개합니다.',
    userName: '책수집가',
    avatar: '/path/to/avatar6.jpg',
    createdAt: '2023-12-29T13:00:00Z',
  },
  {
    itemId: '40869703',
    title: '고전 문학의 매력',
    description: '고전 문학을 통해 느낄 수 있는 감동을 전합니다.',
    userName: '문학연구소',
    avatar: '/path/to/avatar7.jpg',
    createdAt: '2023-12-28T16:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서 방법 공유',
    description: '효율적으로 책을 읽는 방법을 공유합니다.',
    userName: '효율적독서',
    avatar: '/path/to/avatar8.jpg',
    createdAt: '2023-12-27T17:00:00Z',
  },
  {
    itemId: '40869703',
    title: '독서 기록',
    description: '제가 읽은 책에 대한 기록을 남깁니다.',
    userName: '기록자',
    avatar: '/path/to/avatar9.jpg',
    createdAt: '2023-12-26T18:00:00Z',
  },
  {
    itemId: '40869703',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
  {
    itemId: '278770576',
    title: '새로운 책 소개',
    description: '최근에 구매한 책을 소개합니다.',
    userName: '새책사랑',
    avatar: '/path/to/avatar10.jpg',
    createdAt: '2023-12-25T19:00:00Z',
  },
];

const likedReviews = [
  {
    username: 'Lovely ChaeChae',
    date: '2024.08.01',
    content: '새롭네요!',
    likes: 1,
    rating: 4, // 별점 추가
  },
  {
    username: '독서왕난이',
    date: '2024.02.27',
    content: '도슨트북 새롭고 재미있어요',
    likes: 1,
    rating: 5, // 별점 추가
  },
  {
    username: '다비다나고양이',
    date: '2024.10.16',
    content: '책에 더 흥미를 갖게 도와주는 것 같아요',
    likes: 1,
    rating: 3, // 별점 추가
  },
];

export const userHandlers = [
  http.get(`/api/user/:userId/feeds`, () => {
    return HttpResponse.json({
      posts: userPosts.slice(0, 3),
      reviews: userReviews,
    });
  }),
  http.get(`/api/user/:userId/feeds/liked`, () => {
    return HttpResponse.json({
      posts: likedPosts.slice(0, 3),
      reviews: likedReviews,
    });
  }),
  http.get('/api/user/:userId/feeds/:feedType', ({ params, request }) => {
    const { feedType } = params;
    const url = new URL(request.url); // 문자열 URL을 URL 객체로 변환
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = 5; // 한 페이지당 리뷰 수

    const selectedFeed = feedType === 'post' ? userPosts : userReviews;
    const totalFeeds = selectedFeed.length;
    const startIndex = (page - 1) * limit;
    const paginatedFeeds = selectedFeed.slice(startIndex, startIndex + limit);

    return HttpResponse.json(
      { feeds: paginatedFeeds, totalFeeds },
      { status: 200 },
    );
  }),
  http.get('/api/user/:userId/feeds/liked/:feedType', ({ params, request }) => {
    const { feedType } = params;
    const url = new URL(request.url); // 문자열 URL을 URL 객체로 변환
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = 5; // 한 페이지당 리뷰 수

    const selectedFeed = feedType === 'post' ? likedPosts : likedReviews;
    const totalFeeds = selectedFeed.length;
    const startIndex = (page - 1) * limit;
    const paginatedFeeds = selectedFeed.slice(startIndex, startIndex + limit);

    return HttpResponse.json(
      { feeds: paginatedFeeds, totalFeeds },
      { status: 200 },
    );
  }),

  http.post('/api/user/:userId/password-check', async ({ request, params }) => {
    const { password } = (await request.json()) as { password: string };
    const { userId } = params;

    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem('userInfo');

    if (!storedUserInfo) {
      return HttpResponse.json(
        {
          success: false,
          message: '사용자 정보를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    const users = JSON.parse(storedUserInfo);
    const user = users.find((u: { userId: string }) => u.userId === userId);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: '해당 사용자를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    const isPasswordCorrect = password === user.password;

    if (isPasswordCorrect) {
      return HttpResponse.json(
        {
          success: true,
          message: '비밀번호 확인 완료',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      },
      { status: 401 },
    );
  }),

  http.get('/api/user/:userId', ({ params }) => {
    const { userId } = params;

    return HttpResponse.json(
      {
        userId,
        name: mockUser.name,
        phone: mockUser.phone,
        avatarUrl: mockUser.avatarUrl,
      },
      { status: 200 },
    );
  }),

  http.put('/api/user/:userId', async ({ params, request }) => {
    const { userId } = params;
    const updatedField = (await request.json()) as Partial<typeof mockUser>;

    return HttpResponse.json(
      {
        success: true,
        message: '개인 정보 수정이 완료되었습니다.',
        data: {
          userId,
          ...updatedField,
        },
      },
      { status: 200 },
    );
  }),

  http.post('/api/user/:userId/avatar', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');

    if (!file || !(file instanceof File)) {
      return HttpResponse.json(
        {
          success: false,
          message: '올바른 이미지를 업로드해주세요.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        message: '성공적으로 업로드되었습니다.',
        avatarUrl: mockUser.avatarUrl,
      },
      { status: 200 },
    );
  }),

  http.delete('/api/user/:userId/avatar', async () => {
    return HttpResponse.json(
      {
        success: true,
        message: '성공적으로 삭제되었습니다.',
      },
      { status: 200 },
    );
  }),
];
