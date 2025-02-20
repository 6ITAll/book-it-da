import { NavigateFunction } from 'react-router-dom';
import RoutePaths from '@routes/RoutePath';
import { Book } from '@shared/types/type';
import { MoreType } from '@components/BookDetailPage/types';

// 뒤로가기 함수
export const navigateBack = (navigate: NavigateFunction) => {
  navigate(-1);
};

// 책 상세 페이지로 이동하는 함수
export const navigateToBookDetailPage = (
  navigate: NavigateFunction,
  isbn: string,
) => {
  navigate(`${RoutePaths.BOOKDETAIL}/${isbn}`);
};

// 포스팅 상세 페이지로 이동하는 함수
export const navigateToPostingDetailPage = (
  navigate: NavigateFunction,
  postId: string,
) => {
  navigate(`${RoutePaths.POSTING}/${postId}`);
};

// 유저 페이지로 이동하는 함수
export const navigateToUserPage = (
  navigate: NavigateFunction,
  username: string,
  replace?: boolean,
) => {
  if (!username) {
    console.error('Invalid userId:', username);
    return;
  }
  navigate(`${RoutePaths.MY_PAGE}/${username}`, { replace });
};

// 피드 페이지로 이동하는 함수
export const navigateToMainPage = (navigate: NavigateFunction) => {
  navigate(RoutePaths.MAIN);
};

// 포스팅 작성 페이지로 이동
export const navigateToPostingWritePage = (
  navigate: NavigateFunction,
  book?: Book,
) => {
  if (book) {
    navigate(RoutePaths.POSTING_WRITE, { state: { book } });
  } else {
    navigate(RoutePaths.POSTING_WRITE);
  }
};

// 포스팅 수정 페이지로 이동
export const navigateToPostingEditPage = (
  navigate: NavigateFunction,
  postingId: string,
) => {
  navigate(`${RoutePaths.POSTING_EDIT}/${postingId}`);
};

// 책 상세 페이지 더보기 페이지로 이동하는 함수
export const navigateToBookDetailPostMorePage = (
  navigate: NavigateFunction,
  isbn: string,
  type: MoreType,
) => {
  navigate(`${RoutePaths.BOOKDETAIL}/${isbn}/${type}`);
};

// 로그인 페이지로 이동하는 함수
export const navigateToLoginPage = (navigate: NavigateFunction) => {
  navigate(`${RoutePaths.LOGIN}`);
};

// 검색 페이지로 이동하는 함수
export const navigateToSearchPage = (
  navigate: NavigateFunction,
  query?: string,
) => {
  if (query) {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  } else {
    navigate('/search');
  }
};

// 회원정보 수정 페이지로 이동하는 함수
export const navigateToProfileEditPage = (navigate: NavigateFunction) => {
  navigate(`${RoutePaths.EDIT_ACCOUNT}`);
};

// 회원가입 페이지로 이동하는 함수
export const navigateToSignUpPage = (navigate: NavigateFunction) => {
  navigate(`${RoutePaths.SIGNUP}`);
};

export const navigateToUserPostMorePage = (
  navigate: NavigateFunction,
  username: string,
  userTabType: string,
  postType: string,
) => {
  if (userTabType === '내 피드' && postType === 'reviews') {
    navigate(
      `${RoutePaths.MY_PAGE}/${username}/${RoutePaths.FEEDS}/${RoutePaths.REVIEWS}`,
    );
  } else if (userTabType === '내 피드' && postType === 'postings') {
    navigate(
      `${RoutePaths.MY_PAGE}/${username}/${RoutePaths.FEEDS}/${RoutePaths.POSTINGS}`,
    );
  } else if (userTabType === '좋아요한 피드' && postType === 'reviews') {
    navigate(
      `${RoutePaths.MY_PAGE}/${username}/${RoutePaths.LIKED}/${RoutePaths.REVIEWS}`,
    );
  } else if (userTabType === '좋아요한 피드' && postType === 'postings') {
    navigate(
      `${RoutePaths.MY_PAGE}/${username}/${RoutePaths.LIKED}/${RoutePaths.POSTINGS}`,
    );
  }
};

// 책장 페이지로 이동하는 함수
export const navigateToBookShelvesPage = (
  navigate: NavigateFunction,
  username: string,
  shelfId: string,
) => {
  navigate(
    `${RoutePaths.MY_PAGE}/${username}${RoutePaths.BOOKSHELVES}/${shelfId}`,
  );
};

// 카카오 회원가입 시 추가 정보 입력 페이지로 이동하는 함수
export const navigateToAdditionalInfoPage = (navigate: NavigateFunction) => {
  navigate(RoutePaths.KAKAO_ADDITIONAL_INFO);
};

export const navigateToPasswordCheckPage = (navigate: NavigateFunction) => {
  navigate(`${RoutePaths.EDIT_ACCOUNT}/${RoutePaths.PASSWORD_CHECK}`);
};
