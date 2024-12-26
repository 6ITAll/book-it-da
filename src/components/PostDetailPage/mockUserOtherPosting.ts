const IMAGES = {
  sample1: new URL('../../assets/images/sample1.jpg', import.meta.url).href,
  sample2: new URL('../../assets/images/sample2.jpg', import.meta.url).href,
  sample3: new URL('../../assets/images/sample3.jpg', import.meta.url).href,
  sample4: new URL('../../assets/images/sample4.jpg', import.meta.url).href,
  sample5: new URL('../../assets/images/sample5.jpg', import.meta.url).href,
};

export const mockUserOtherPosting = [
  {
    id: 2,
    title: '인상적인 책 리뷰',
    content:
      '이 책의 매력은 독특한 서술방식과 깊이 있는 심리묘사에 있습니다. 특히 주인공의 내면세계를 표현하는 방식이 인상적이었습니다.',
    createdAt: '2024-01-20T09:00:00.000Z',
    book: {
      title: '노르웨이의 숲',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample1,
    },
  },
  {
    id: 3,
    title: '올해의 베스트 책',
    content:
      '올해 읽은 책 중 가장 인상 깊었던 작품입니다. 작가의 섬세한 문체와 깊이 있는 통찰력이 돋보입니다.',
    createdAt: '2024-01-18T09:00:00.000Z',
    book: {
      title: '해변의 카프카',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample2,
    },
  },
  {
    id: 4,
    title: '감동적인 결말',
    content:
      '마지막 장면에서 느껴지는 감동은 정말 오래도록 기억에 남을 것 같습니다. 특히 주인공의 성장과정이...',
    createdAt: '2024-01-15T09:00:00.000Z',
    book: {
      title: '상실의 시대',
      author: '무라카미 하루키',
      imageUrl: IMAGES.sample3,
    },
  },
];

export const mockBookPosts = [
  {
    id: 5,
    title: '금각사의 아름다움',
    content:
      '미시마 유키오의 섬세한 묘사는 독자를 완전히 몰입시킵니다. 특히 금각사를 바라보는 주인공의 시선이...',
    user: {
      id: 3,
      name: 'Jane Smith',
      avatarUrl: IMAGES.sample4,
    },
    createdAt: '2024-01-19T09:00:00.000Z',
  },
  {
    id: 6,
    title: '금각사를 읽고',
    content:
      '불교 사찰을 배경으로 한 이야기가 이렇게 깊은 울림을 줄 수 있다니 놀랍습니다.',
    user: {
      id: 4,
      name: 'Mike Johnson',
      avatarUrl: IMAGES.sample5,
    },
    createdAt: '2024-01-17T09:00:00.000Z',
  },
];
