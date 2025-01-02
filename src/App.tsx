import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginSignup from './pages/LoginSignupPage/LoginPage';
import SignupPage from './pages/LoginSignupPage/SignupPage';
import FeedPage from './pages/MainPage/Main';
import BookSearchPage from './pages/BookSearchPage/BookSearch';
import MyPage from './pages/MyPage/MyPage';
import './App.css';
import BookDetailPage from '@pages/BookDetailPage/BookDetailPage';
import ReviewMorePage from '@pages/ReviewMorePage/ReviewMorePage';
import PostMorePage from '@pages/PostMorePage/PostMorePage';
import BookShelvesPage from '@pages/BookShelvesPage/BookShelvesPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="logo">잇다</div>
          <div className="search-bar">
            <input type="text" placeholder="책 검색..." />
            <button>검색</button>
          </div>
          <div className="login-button">
            <Link to="/login-signup">로그인</Link>
          </div>
        </header>

        <div className="main-content">
          <main className="content">
            <Routes>
              <Route path="/login-signup" element={<LoginSignup />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/my-page/:userId?" element={<MyPage />} />
              <Route path="/" element={<FeedPage />} />
              <Route path="/bookDetail/:itemId" element={<BookDetailPage />} />
              <Route
                path="/bookDetail/:itemId/reviews"
                element={<ReviewMorePage />}
              />
              <Route
                path="/bookDetail/:itemId/posts"
                element={<PostMorePage />}
              />
              {/* 추후 변경 */}
              <Route
                path="/my-page/:userId/bookshelves/:bookshelfId"
                element={<BookShelvesPage />}
              />
            </Routes>
          </main>
        </div>

        <footer className="footer">
          <p>&copy; 2024 육잇다 All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
