import { NavigateFunction } from 'react-router-dom';

// 뒤로가기 함수
export const navigateBack = (navigate: NavigateFunction) => {
  navigate(-1);
  console.log(1);
};

// 책 상세 페이지로 이동하는 함수
export const navigateToBookDetailPage = (
  navigate: NavigateFunction,
  isbn: string,
) => {
  navigate(`/bookDetail/${isbn}`);
};

// 포스팅 상세 페이지로 이동하는 함수
export const navigateToPostingDetailPage = (
  navigate: NavigateFunction,
  postId: number,
) => {
  navigate(`/posting/${postId}`);
};

export const navigateToUserPage = (
  navigate: NavigateFunction,
  userId: string | number,
) => {
  if (!userId) {
    console.error('Invalid userId:', userId);
    return;
  }
  navigate(`/my-page/${userId}`);
};
