import { Post, PostType, FeedType, Book } from '@shared/types/type';

const IMAGES = {
  sample1: new URL('../../assets/images/sample1.jpg', import.meta.url).href,
  sample2: new URL('../../assets/images/sample2.jpg', import.meta.url).href,
  sample3: new URL('../../assets/images/sample3.jpg', import.meta.url).href,
  sample4: new URL('../../assets/images/sample4.jpg', import.meta.url).href,
  sample5: new URL('../../assets/images/sample5.jpg', import.meta.url).href,
  sample6: new URL('../../assets/images/sample6.jpg', import.meta.url).href,
  sample7: new URL('../../assets/images/sample7.jpg', import.meta.url).href,
  sample8: new URL('../../assets/images/sample8.jpg', import.meta.url).href,
  sample9: new URL('../../assets/images/sample9.jpg', import.meta.url).href,
  sample10: new URL('../../assets/images/sample10.jpg', import.meta.url).href,
};

export const mockBooks: Book[] = [
  {
    bookTitle: '금각사',
    author: '미시마 유키오',
    imageUrl: IMAGES.sample1,
  },
  {
    bookTitle: '여행의 이유',
    author: '김영하',
    imageUrl: IMAGES.sample2,
  },
  {
    bookTitle: '목숨을 팝니다',
    author: '미시마 유키오',
    imageUrl: IMAGES.sample3,
  },
  {
    bookTitle: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: IMAGES.sample4,
  },
  {
    bookTitle: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: IMAGES.sample5,
  },
  {
    bookTitle: '보통의 존재',
    author: '이석원',
    imageUrl: IMAGES.sample6,
  },
  {
    bookTitle: '가나',
    author: '정용준',
    imageUrl: IMAGES.sample7,
  },
  {
    bookTitle: '사랑의 잔상들',
    author: '장혜령',
    imageUrl: IMAGES.sample8,
  },
  {
    bookTitle: '시와 산책',
    author: '한정원',
    imageUrl: IMAGES.sample9,
  },
  {
    bookTitle: '나는 나를 파괴할 권리가 있다',
    author: '김영하',
    imageUrl: IMAGES.sample10,
  },
];

// 랜덤 높이를 생성하는 함수 > 추후 삭제할 예정
export const generateRandomHeight = (): number => {
  const possibleHeights = [300];
  return possibleHeights[Math.floor(Math.random() * possibleHeights.length)];
};

// 랜덤 시간을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomTimeAgo = (): string => {
  const possibleTimeAgo = ['방금', '1분 전', '1시간 전', '하루 전'];
  return possibleTimeAgo[Math.floor(Math.random() * possibleTimeAgo.length)];
};

// 랜덤 제목을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomTitle = (): string => {
  const possibleTitle = [
    '재밌게 읽었습니다.',
    '또 읽고 싶어요',
    '인생 책입니다',
  ];
  return possibleTitle[Math.floor(Math.random() * possibleTitle.length)];
};

// 랜덤 제목을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomDescription = (): string => {
  const possibleDescription = [
    '끝까지 읽게 되는 책이네요.',
    '문장력이 엄청난 책이에요.',
    '소장 가치가 있는 책이에요.',
  ];
  return possibleDescription[
    Math.floor(Math.random() * possibleDescription.length)
  ];
};

// 랜덤 포스트 타입을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomPostType = (): PostType => {
  const possiblePostType: PostType[] = ['한줄평', '포스팅'];
  return possiblePostType[Math.floor(Math.random() * possiblePostType.length)];
};

// 랜덤 피드 타입을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomFeedType = (): FeedType => {
  const possibleFeedType: FeedType[] = ['추천', '팔로워', '팔로잉'];
  return possibleFeedType[Math.floor(Math.random() * possibleFeedType.length)];
};

// 랜덤으로 책을 선택하는 함수 > 추후 삭제할 예정
export const getRandomBook = (): Book => {
  return mockBooks[Math.floor(Math.random() * mockBooks.length)];
};

// Mock Posts 초기값
export const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => {
  const book = getRandomBook();
  return {
    id: i + 1,
    title: generateRandomTitle(),
    description: generateRandomDescription(),
    imageUrl: book.imageUrl,
    userName: `user${i + 1}`,
    timeAgo: generateRandomTimeAgo(),
    postType: generateRandomPostType(),
    feedType: generateRandomFeedType(),
    bookTitle: book.bookTitle,
    bookAuthor: book.author,
  };
});
