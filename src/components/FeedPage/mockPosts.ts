import { Post, PostType, FeedType, Book } from '@shared/types/type';
import sampleImage1 from '@/assets/images/sample1.jpg';
import sampleImage2 from '@/assets/images/sample2.jpg';
import sampleImage3 from '@/assets/images/sample3.jpg';
import sampleImage4 from '@/assets/images/sample4.jpg';
import sampleImage5 from '@/assets/images/sample5.jpg';

export const mockBooks: Book[] = [
  {
    bookTitle: '금각사',
    author: '미시마 유키오',
    imageUrl: sampleImage1,
  },
  {
    bookTitle: '여행의 이유',
    author: '김영하',
    imageUrl: sampleImage2,
  },
  {
    bookTitle: '목숨을 팝니다',
    author: '미시마 유키오',
    imageUrl: sampleImage3,
  },
  {
    bookTitle: '눈먼 자들의 도시',
    author: '주제 사라마구',
    imageUrl: sampleImage4,
  },
  {
    bookTitle: '밤의 사색',
    author: '헤르만 헤세',
    imageUrl: sampleImage5,
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
