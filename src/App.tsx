import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRouter from './routes/index';
import Header from '@components/Header/Header';
import './App.css';

const AppContent = (): JSX.Element => {
  const location = useLocation();
  const isPostingDetail = location.pathname.includes('/posting/');

  return (
    <div className={isPostingDetail ? 'full-screen' : 'app-container'}>
      {!isPostingDetail && <Header />}
      <main className={isPostingDetail ? '' : 'content'}>
        <AppRouter />
      </main>
      {!isPostingDetail && (
        <footer className="footer">
          <p>© 2024 육잇다 All rights reserved.</p>
        </footer>
      )}
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
