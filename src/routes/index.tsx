import { Routes, Route } from 'react-router-dom';
import LoginSignup from '@pages/LoginSignupPage/LoginPage';
import SignupPage from '@pages/LoginSignupPage/SignupPage';
import FeedPage from '@pages/MainPage/Main';
import BookSearchPage from '@pages/BookSearchPage/BookSearch';
import MyPage from '@pages/MyPage/MyPage';
import NotFoundPage from '@pages/NotFoundPage/NotFound';
import RoutePaths from './RoutePath';
import BookShelvesPage from '@pages/BookShelvesPage/BookShelvesPage';
import PostingDetailPage from '@pages/PostingDetailPage/PostingDetailPage';
import BookDetailPage from '@pages/BookDetailPage/BookDetailPage';
import ReviewMorePage from '@pages/ReviewMorePage/ReviewMorePage';
import PostMorePage from '@pages/PostMorePage/PostMorePage';
import EditAccountPage from '@pages/EditAccountPage.tsx/EditAccountPage';
import PasswordChkPage from '@pages/PasswordChkPage/PasswordChkPage';
import KakaoCallback from '@features/SNSLogin/auth/KakaoCallback';
import PostingWritePage from '@pages/PostingWritePage/PostingWritePage';
import LikedPostMorePage from '@pages/LikedPostMorePage/LikedPostMorePage';
import LikedReviewMorePage from '@pages/LikedReviewMorePage/LikedReviewMorePage';
const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<FeedPage />} />
      <Route path={RoutePaths.LOGIN} element={<LoginSignup />} />
      <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
      <Route path={RoutePaths.FEED} element={<FeedPage />} />
      <Route path={RoutePaths.SEARCH} element={<BookSearchPage />} />
      <Route path={`${RoutePaths.MY_PAGE}/:userId?`} element={<MyPage />} />
      <Route path="/oauth/kakao" element={<KakaoCallback />} />
      <Route
        path={`${RoutePaths.EDIT_ACCOUNT}/passwordChk`}
        element={<PasswordChkPage />}
      />
      <Route
        path={`${RoutePaths.EDIT_ACCOUNT}`}
        element={<EditAccountPage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:itemId`}
        element={<BookDetailPage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:itemId/${RoutePaths.REVIEWS}`}
        element={<ReviewMorePage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:itemId/${RoutePaths.POSTS}`}
        element={<PostMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:userId?${RoutePaths.BOOKSHELVES}/:bookShelvesId?`}
        element={<BookShelvesPage />}
      />
      <Route path={RoutePaths.POSTING_WRITE} element={<PostingWritePage />} />
      <Route
        path={`${RoutePaths.POSTING_EDIT}/:postingId`}
        element={<PostingWritePage />}
      />
      <Route
        path={`${RoutePaths.POSTING}/:postingId?`}
        element={<PostingDetailPage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:userId?/feeds/${RoutePaths.POSTS}`}
        element={<LikedPostMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:userId?/feeds/${RoutePaths.REVIEWS}`}
        element={<LikedReviewMorePage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
