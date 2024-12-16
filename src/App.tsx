import AppRouter from './routes';

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const message: string = 'hello world'; // 테스트용 코드
  var test = 0; // 테스트용 코드
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
