import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { store } from './store/index.tsx';
import { Provider } from 'react-redux';
import { muiTheme } from '@styles/theme.ts';
import { ThemeProvider } from '@mui/material';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </Provider>,
  );
});
