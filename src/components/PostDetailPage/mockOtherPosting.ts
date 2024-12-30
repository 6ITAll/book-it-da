export interface OtherPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  book?: {
    title: string;
    author: string;
    imageUrl?: string;
  };
  likeCount?: number;
}

const IMAGES = {
  sample1: new URL('../../assets/images/sample1.jpg', import.meta.url).href,
  sample2: new URL('../../assets/images/sample2.jpg', import.meta.url).href,
  sample3: new URL('../../assets/images/sample3.jpg', import.meta.url).href,
};

export const mockUserOtherPosting: OtherPost[] = [
  {
    id: 1,
    title: '인상적인 책 리뷰',
    content:
      '이 책의 매력은 독특한 서술방식과 깊이 있는 심리묘사에 있습니다. 특히 주인공의 내면세계를 표현하는 방식이 인상적이었습니다.',
    createdAt: '2024-01-20T09:00:00.000Z',
    user: {
      id: 1,
      name: 'John Doe',
      avatarUrl: IMAGES.sample2,
    },
    book: {
      title: '노르웨이의 숲',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample1,
    },
  },
  {
    id: 2,
    title: '올해의 베스트 책',
    content:
      '올해 읽은 책 중 가장 인상 깊었던 작품입니다. 작가의 섬세한 문체와 깊이 있는 통찰력이 돋보입니다.',
    createdAt: '2024-01-18T09:00:00.000Z',
    user: {
      id: 1,
      name: 'John Doe',
      avatarUrl: IMAGES.sample2,
    },
    book: {
      title: '해변의 카프카',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample3,
    },
  },
  {
    id: 3,
    title: '올해의 베스트 책',
    content:
      '올해 읽은 책 중 가장 인상 깊었던 작품입니다. 작가의 섬세한 문체와 깊이 있는 통찰력이 돋보입니다.',
    createdAt: '2024-01-18T09:00:00.000Z',
    user: {
      id: 1,
      name: 'John Doe',
      avatarUrl: IMAGES.sample2,
    },
    book: {
      title: '해변의 카프카',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample3,
    },
  },
];

export const mockBookOtherPosting: OtherPost[] = [
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
];
