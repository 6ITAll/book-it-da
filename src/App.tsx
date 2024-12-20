import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginSignup from './pages/MainPage/Login';
import FeedPage from './pages/MainPage/Main';
import BookSearchPage from './pages/BookSearchPage/BookSearch';
import MyPage from './pages/MyPage/MyPage';
import './App.css';

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
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/my-page/:userId?" element={<MyPage />} />
              <Route path="/" element={<FeedPage />} />
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
