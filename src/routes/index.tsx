import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import RoutePaths from './RoutePath';

const LoginSignup = lazy(() => import('@pages/LoginSignupPage/LoginPage'));
const SignupPage = lazy(() => import('@pages/LoginSignupPage/SignupPage'));
const FeedPage = lazy(() => import('@pages/MainPage/Main'));
const BookSearchPage = lazy(() => import('@pages/BookSearchPage/BookSearch'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const BookShelvesPage = lazy(
  () => import('@pages/BookShelvesPage/BookShelvesPage'),
);
const PostingDetailPage = lazy(
  () => import('@pages/PostingDetailPage/PostingDetailPage'),
);
const BookDetailPage = lazy(
  () => import('@pages/BookDetailPage/BookDetailPage'),
);
const EditAccountPage = lazy(
  () => import('@pages/EditAccountPage/EditAccountPage'),
);
const PasswordChkPage = lazy(
  () => import('@pages/PasswordChkPage/PasswordChkPage'),
);
const KakaoCallback = lazy(
  () => import('@features/SNSLogin/auth/KakaoCallback'),
);
const PostingWritePage = lazy(
  () => import('@pages/PostingWritePage/PostingWritePage'),
);
const LikedPostingMorePage = lazy(
  () => import('@pages/LikedPostingMorePage/LikedPostingMorePage'),
);
const LikedReviewMorePage = lazy(
  () => import('@pages/LikedReviewMorePage/LikedReviewMorePage'),
);
const MyPage = lazy(() => import('@pages/MyPage/MyPage'));
const AdditionalInfoPage = lazy(
  () => import('@pages/AdditionalInfoPage/AdditionalInfoPage'),
);
const UserPostingMorePage = lazy(
  () => import('@pages/UserPostingMorePage/UserPostingMorePage'),
);
const UserReviewMorePage = lazy(
  () => import('@pages/UserReviewMorePage/UserReviewMorePage'),
);
const BookPostingMorePage = lazy(
  () => import('@pages/BookPostingMorePage/BookPostingMorePage'),
);
const BookReviewMorePage = lazy(
  () => import('@pages/BookReviewMorePage/BookReviewMorePage'),
);

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
              <Navigate
                to={`${RoutePaths.EDIT_ACCOUNT}/${RoutePaths.PASSWORD_CHECK}`}
                replace
              />
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
        element={<BookReviewMorePage />}
      />
      <Route
        path={`${RoutePaths.BOOKDETAIL}/:isbn/${RoutePaths.POSTINGS}`}
        element={<BookPostingMorePage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:username?${RoutePaths.BOOKSHELVES}/:bookShelfId?`}
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
