import { Routes, Route, Navigate } from 'react-router-dom';
import LoginSignup from '@pages/LoginSignupPage/LoginPage';
import SignupPage from '@pages/LoginSignupPage/SignupPage';
import FeedPage from '@pages/MainPage/Main';
import BookSearchPage from '@pages/BookSearchPage/BookSearch';
import NotFoundPage from '@pages/NotFoundPage/NotFound';
import RoutePaths from './RoutePath';
import BookShelvesPage from '@pages/BookShelvesPage/BookShelvesPage';
import PostingDetailPage from '@pages/PostingDetailPage/PostingDetailPage';
import BookDetailPage from '@pages/BookDetailPage/BookDetailPage';
import ReviewMorePage from '@pages/ReviewMorePage/ReviewMorePage';
import PostingMorePage from '@pages/PostingMorePage/PostMorePage';
import EditAccountPage from '@pages/EditAccountPage.tsx/EditAccountPage';
import PasswordChkPage from '@pages/PasswordChkPage/PasswordChkPage';
import KakaoCallback from '@features/SNSLogin/auth/KakaoCallback';
import PostingWritePage from '@pages/PostingWritePage/PostingWritePage';
import LikedPostingMorePage from '@pages/LikedPostingMorePage/LikedPostingMorePage';
import LikedReviewMorePage from '@pages/LikedReviewMorePage/LikedReviewMorePage';
import MyPage from '@pages/MyPage/MyPage';
import AdditionalInfoPage from '@pages/AdditionalInfoPage/AdditionalInfoPage';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import UserPostingMorePage from '@pages/UserPostingMorePage/UserPostingMorePage';
import UserReviewMorePage from '@pages/UserReviewMorePage/UserReviewMorePage';
const AppRouter = () => {
  const { userInfo, checkedPassword } = useSelector(
    (state: RootState) => state.user,
  );
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<FeedPage />} />
      <Route path={RoutePaths.LOGIN} element={<LoginSignup />} />
      <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
      <Route path={RoutePaths.FEED} element={<FeedPage />} />
      <Route path={RoutePaths.SEARCH} element={<BookSearchPage />} />
      <Route path={`${RoutePaths.MY_PAGE}/:username`} element={<MyPage />} />
      <Route path="/oauth/kakao" element={<KakaoCallback />} />
      <Route
        path={RoutePaths.KAKAO_ADDITIONAL_INFO}
        element={<AdditionalInfoPage />}
      />
      <Route
        path={`${RoutePaths.EDIT_ACCOUNT}/passwordChk`}
        element={<PasswordChkPage />}
      />
      <Route
        path={RoutePaths.EDIT_ACCOUNT}
        element={
          userInfo ? (
            userInfo.isSocialLogin || checkedPassword ? (
              <EditAccountPage />
            ) : (
              <Navigate to={`${RoutePaths.EDIT_ACCOUNT}/passwordChk`} replace />
            )
          ) : (
            <div>Loading...</div>
          )
        }
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:isbn`}
        element={<BookDetailPage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:isbn/${RoutePaths.REVIEWS}`}
        element={<ReviewMorePage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:isbn/${RoutePaths.POSTINGS}`}
        element={<PostingMorePage />}
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
        path={`${RoutePaths.MY_PAGE}/:username?/feeds/${RoutePaths.POSTINGS}`}
        element={<UserPostingMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:username?/feeds/${RoutePaths.REVIEWS}`}
        element={<UserReviewMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:username?/liked/${RoutePaths.POSTINGS}`}
        element={<LikedPostingMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:username?/liked/${RoutePaths.REVIEWS}`}
        element={<LikedReviewMorePage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
