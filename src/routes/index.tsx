import { Routes, Route } from 'react-router-dom';
import LoginSignup from '@pages/MainPage/Login';
import FeedPage from '@pages/MainPage/Main';
import BookSearchPage from '@pages/BookSearchPage/BookSearch';
import MyPage from '@pages/MyPage/MyPage';
import NotFoundPage from '@pages/NotFoundPage/NotFound';
import RoutePaths from './RoutePath';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<FeedPage />} />
      <Route path={RoutePaths.LOGIN_SIGNUP} element={<LoginSignup />} />
      <Route path={RoutePaths.FEED} element={<FeedPage />} />
      <Route path={RoutePaths.SEARCH} element={<BookSearchPage />} />
      <Route path={`${RoutePaths.MY_PAGE}/:userId?`} element={<MyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
