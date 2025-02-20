import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import AppRouter from './routes/index';
import Header from '@components/Header/Header';
import SnackBar from './components/commons/SnackBar';
import { store, RootState } from '@store/index';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme } from '@styles/theme';
import { usePerformAutoLogin } from '@hooks/usePerformAutoLogin';
import { useAuthStateChange } from '@hooks/useAuthStateChange';
import RequireAdditionalInfo from '@hooks/useRequireAdditionalInfo';

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
    </div>
  );
};

const App = (): JSX.Element => {
  const themeMode = useSelector((state: RootState) => state.darkMode.mode);
  const theme = createAppTheme(themeMode);
  usePerformAutoLogin();
  useAuthStateChange();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <RequireAdditionalInfo />
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
