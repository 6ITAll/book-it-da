import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import AppRouter from './routes/index';
import Header from '@components/Header/Header';
import SnackBar from './components/commons/SnackBar';
import { store, RootState } from '@store/index';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme } from '@styles/theme';
import DarkModeButton from '@components/DarkModeButton/DarkModeButton';

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
      <SnackBar />
      <DarkModeButton /> {/* 다크 모드 토글 버튼 추가 */}
    </div>
  );
};

const App = (): JSX.Element => {
  const themeMode = useSelector((state: RootState) => state.darkMode.mode);
  const theme = createAppTheme(themeMode);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
