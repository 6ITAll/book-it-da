import { NavigateFunction } from 'react-router-dom';

// 책 상세 페이지로 이동하는 함수
export const navigateToBookDetailPage = (
  navigate: NavigateFunction,
  itemId: number,
) => {
  navigate(`/bookDetail/${itemId}`);
};

export const navigateToPostingDetailPage = (
  navigate: NavigateFunction,
  postId: number,
) => {
  navigate(`/posting/${postId}`);
};

export const navigateToUserPage = (
  navigate: NavigateFunction,
  userId: string,
) => {
  if (!userId) {
    console.error('Invalid userId:', userId);
    return;
  }
  navigate(`/my-page/${userId}`);
};
