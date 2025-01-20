import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line
    Kakao: any;
  }
}

export const useKakaoSDK = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
