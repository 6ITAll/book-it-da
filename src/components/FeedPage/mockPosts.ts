import { Post } from '@/shared/types/type';

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

// 랜덤 타입을 생성하는 함수 > 추후 삭제할 예정
export const generateRandomPostType = (): string => {
  const possiblePostType = ['한줄평', '포스팅'];
  return possiblePostType[Math.floor(Math.random() * possiblePostType.length)];
};

// Mock Posts 초기값
export const mockPosts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  description: `This is the description for post ${i + 1}`,
  imageUrl: `https://via.placeholder.com/200x${generateRandomHeight()}`,
  userName: `user${i + 1}`,
  timeAgo: generateRandomTimeAgo(),
  postType: generateRandomPostType(),
}));
