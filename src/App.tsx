import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/index';
import Header from '@components/Header/Header';
import './App.css';

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content">
          <AppRouter />
        </main>
        <footer className="footer">
          <p>© 2024 육잇다 All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
