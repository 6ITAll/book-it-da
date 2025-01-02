import { http, HttpResponse } from 'msw';

const CURRENT_USER = {
  id: 1,
  name: 'Current User',
};

const IMAGES = {
  sample1: new URL('../../assets/images/sample1.jpg', import.meta.url).href,
  sample2: new URL('../../assets/images/sample2.jpg', import.meta.url).href,
  sample3: new URL('../../assets/images/sample3.jpg', import.meta.url).href,
};

const mockPosts = [
  {
    id: 1,
    title: '포스팅 제목',
    content: `
    <p><strong>이 책을 처음 접했을 때의 느낌은 아직도 생생합니다.</strong></p>
    <h2>인상 깊었던 구절</h2>
    <blockquote>"가장 행복한 사람은 다른 사람의 행복을 위해 무언가를 하는 사람이다." - p.123</blockquote>
    <h2>책의 매력적인 부분</h2>
    <p>작가는 섬세한 묘사로 독자들을 이야기 속으로 끌어들입니다. 특히 다음과 같은 장면들이 인상적이었습니다:</p>
    <ul>
      <li>주인공의 내적 성장 과정</li>
      <li>갈등 해결 방식의 현실성</li>
      <li>감정 선의 자연스러운 흐름</li>
    </ul>
    <h2>개인적인 소감</h2>
    <p><span style="color: rgb(102, 102, 102);">이 책은 단순한 소설이 아닌, 삶의 진정한 의미를 되새기게 하는 거울과도 같았습니다.</span></p>
    <p><em>이 책을 읽으면서 느낀 감동을 오래도록 간직하고 싶습니다.</em></p>
    `,
    createdAt: '2024-01-15T09:00:00.000Z',
    book: {
      title: '금각사',
      author: '미시마 유키오',
      itemId: 107413605,
      imageUrl: '/src/assets/images/sample1.jpg',
    },
    user: {
      id: 2,
      name: 'John Doe',
      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
    },
    isLiked: false,
  },
];

const mockOtherPosts = {
  bookPosts: [
    {
      id: 3,
      title: '금각사의 상징성에 대하여',
      content:
        '금각사가 상징하는 완벽한 아름다움과 주인공의 내면 세계가 충돌하는 방식이 인상적입니다.',
      createdAt: '2024-01-19T09:00:00.000Z',
      user: {
        id: 3,
        name: '김문학',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
      },
      likeCount: 24,
    },
    {
      id: 4,
      title: '미시마 유키오의 섬세한 묘사',
      content:
        '불교 사찰을 배경으로 인간의 집착과 광기를 그려내는 작가의 필력이 돋보입니다.',
      createdAt: '2024-01-17T09:00:00.000Z',
      user: {
        id: 4,
        name: '박독서',
        avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
      },
      likeCount: 18,
    },
    {
      id: 5,
      title: '금각사와 현대사회',
      content: '현대 사회의 관점에서 금각사를 재해석해보았습니다.',
      createdAt: '2024-01-16T09:00:00.000Z',
      user: {
        id: 5,
        name: '이독자',
        avatarUrl: 'https://mui.com/static/images/avatar/3.jpg',
      },
      likeCount: 15,
    },
  ],
  userPosts: [
    {
      id: 101,
      title: '노르웨이의 숲 리뷰',
      content: '무라카미 하루키의 대표작을 읽고...',
      createdAt: '2024-01-20T09:00:00.000Z',
      user: {
        id: 2, // 원글 작성자와 동일한 ID
        name: 'John Doe', // 원글 작성자와 동일한 이름
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg', // 원글 작성자와 동일한 아바타
      },
      book: {
        title: '노르웨이의 숲',
        author: '무라카미 하루키',
        imageUrl: IMAGES.sample1,
      },
    },
    {
      id: 102,
      title: '해변의 카프카 감상',
      content: '카프카의 초현실적인 이야기...',
      createdAt: '2024-01-18T09:00:00.000Z',
      user: {
        id: 2,
        name: 'John Doe',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
      },
      book: {
        title: '해변의 카프카',
        author: '무라카미 하루키',
        imageUrl: IMAGES.sample2,
      },
    },
    {
      id: 103,
      title: '상실의 시대를 읽고',
      content: '젊은 시절의 방황과 성장...',
      createdAt: '2024-01-16T09:00:00.000Z',
      user: {
        id: 2,
        name: 'John Doe',
        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
      },
      book: {
        title: '상실의 시대',
        author: '무라카미 하루키',
        imageUrl: IMAGES.sample3,
      },
    },
  ],
};

export const postingHandlers = [
  // 현재 유저 정보를 가져오는 핸들러
  http.get('/api/me', () => {
    return HttpResponse.json(CURRENT_USER);
  }),

  // 포스팅 정보를 가져오는 핸들러
  http.get('/api/posts/:postId', ({ params }) => {
    const post = mockPosts.find((p) => p.id === Number(params.postId));

    if (!post) {
      return HttpResponse.json(
        { message: '포스팅을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      ...post,
      isCurrentUserAuthor: post.user.id === CURRENT_USER.id,
    });
  }),

  http.get('/api/books/:bookId/posts', () => {
    return HttpResponse.json(mockOtherPosts.bookPosts);
  }),

  http.get('/api/users/:userId/posts', () => {
    return HttpResponse.json(mockOtherPosts.userPosts);
  }),
];
