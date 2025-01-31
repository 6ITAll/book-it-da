import { useEffect } from 'react';
import { supabase } from '@utils/supabaseClient';
import { loginSuccess, setToken, setAutoLogin } from '@features/user/userSlice';
import { useDispatch } from 'react-redux';

export const useSetAutoLoginSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSettings = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session?.user) {
        const providerType = session.data.session.user.app_metadata.provider;
        const isSocialLogin = providerType === 'kakao';

        const { data: settings } = await supabase
          .from('user_settings')
          .select('auto_login')
          .eq('user_id', session.data.session.user.id)
          .single();

        if (settings?.auto_login) {
          dispatch(
            loginSuccess({
              id: session.data.session.user.id,
              email: session.data.session.user.email ?? '',
              isSocialLogin,
            }),
          );
          dispatch(setToken(session.data.session.access_token));
          dispatch(setAutoLogin(true));
        }
      }
    };

    checkSettings();
  }, [dispatch]);
};
