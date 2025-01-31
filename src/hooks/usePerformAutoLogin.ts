import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setAutoLogin, setToken } from '@features/user/userSlice';
import { supabase } from '@utils/supabaseClient';

export const usePerformAutoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAutoLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser(token);
          if (user) {
            const providerType = user.app_metadata.provider;
            const isSocialLogin = providerType === 'kakao';
            dispatch(
              loginSuccess({
                id: user.id,
                email: user.email,
                isSocialLogin,
              }),
            );
            dispatch(setToken(token));
            dispatch(setAutoLogin(true));
          }
        } catch (error) {
          console.error('Auto login error:', error);
          localStorage.removeItem('token');
        }
      }
    };

    checkAutoLogin();
  }, [dispatch]);
};
