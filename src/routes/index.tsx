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
import PostingWritePage from '@pages/PostingWritePage/PostingWritePage';

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
        path={`${RoutePaths.BOOKDETAIL}/:itemId`}
        element={<BookDetailPage />}
      />
      <Route
        path={`${RoutePaths.MY_PAGE}/:userId?${RoutePaths.BOOKSHELVES}/:bookShelvesId?`}
        element={<BookShelvesPage />}
      />
      <Route path={RoutePaths.POSTING_WRITE} element={<PostingWritePage />} />
      <Route
        path={`${RoutePaths.POSTING}/:postingId?`}
        element={<PostingDetailPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
