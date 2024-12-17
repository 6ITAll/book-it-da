import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage/Main';
import NotFoundPage from '../pages/NotFoundPage/NotFound';
import RoutePaths from './RoutePath';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.MAIN} element={<MainPage />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
