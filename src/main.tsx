import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import { muiTheme } from '@styles/theme.ts';
import { ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
