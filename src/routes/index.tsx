import { Routes, Route } from 'react-router-dom';
import LoginSignup from '@pages/LoginSignupPage/LoginPage';
import SignupPage from '@pages/LoginSignupPage/SignupPage';
import FeedPage from '@pages/MainPage/Main';
import BookSearchPage from '@pages/BookSearchPage/BookSearch';
import MyPage from '@pages/MyPage/MyPage';
import NotFoundPage from '@pages/NotFoundPage/NotFound';
import RoutePaths from './RoutePath';
import PostingDetailPage from '@pages/PostDetailPage/PostingDetailPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<FeedPage />} />
      <Route path={RoutePaths.LOGIN} element={<LoginSignup />} />
      <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
      <Route path={RoutePaths.FEED} element={<FeedPage />} />
      <Route path={RoutePaths.SEARCH} element={<BookSearchPage />} />
      <Route path={`${RoutePaths.MY_PAGE}/:userId?`} element={<MyPage />} />
      <Route
        path={`${RoutePaths.POSTING}/:postingId?`}
        element={<PostingDetailPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
