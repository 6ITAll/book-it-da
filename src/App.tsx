import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import BookDetailPage from '@pages/BookDetailPage/BookDetailPage';
import ReviewMorePage from '@pages/ReviewMorePage/ReviewMorePage';
import PostMorePage from '@pages/PostMorePage/PostMorePage';
import store from './store/store';
import LoginSignup from './pages/LoginSignupPage/LoginPage';
import SignupPage from './pages/LoginSignupPage/SignupPage';
import FeedPage from './pages/MainPage/Main';
import BookSearchPage from './pages/BookSearchPage/BookSearch';
import MyPage from './pages/MyPage/MyPage';
import SnackBar from './components/Snackbar/SnackBar';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <header className="header">
            <div className="logo">잇다</div>
            <div className="search-bar">
              <input type="text" placeholder="책 검색..." />
              <button type="button">검색</button>
            </div>
            <div className="login-button">
              <Link to="/login-signup">로그인</Link>
            </div>
          </header>

          <div className="main-content">
            <aside className="sidebar">
              <nav>
                <ul>
                  <li>
                    <Link to="/feed">홈</Link>
                  </li>
                  <li>
                    <Link to="/search">책 검색</Link>
                  </li>
                  <li>
                    <Link to="/my-page">마이페이지</Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className="content">
              <Routes>
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/search" element={<BookSearchPage />} />
                <Route path="/my-page/:userId?" element={<MyPage />} />
                <Route path="/" element={<FeedPage />} />
                <Route
                  path="/bookDetail/:itemId"
                  element={<BookDetailPage />}
                />
                <Route
                  path="/bookDetail/:itemId/reviews"
                  element={<ReviewMorePage />}
                />
                <Route
                  path="/bookDetail/:itemId/posts"
                  element={<PostMorePage />}
                />
              </Routes>
            </main>
          </div>
          <footer className="footer">
            <p>&copy; 2024 육잇다 All rights reserved.</p>
          </footer>
        </div>
        <SnackBar />
      </Router>
    </Provider>
  );
};

export default App;
