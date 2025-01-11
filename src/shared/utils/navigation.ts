import { NavigateFunction } from 'react-router-dom';

// 뒤로가기 함수
export const navigateBack = (navigate: NavigateFunction) => {
  navigate(-1);
  console.log(1);
};

// 책 상세 페이지로 이동하는 함수
export const navigateToBookDetailPage = (
  navigate: NavigateFunction,
  itemId: number,
) => {
  navigate(`/bookDetail/${itemId}`);
};

// 포스팅 상세 페이지로 이동하는 함수
export const navigateToPostingDetailPage = (
  navigate: NavigateFunction,
  postId: number,
) => {
  navigate(`/posting/${postId}`);
};
