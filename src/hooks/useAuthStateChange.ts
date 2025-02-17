import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../utils/supabaseClient';
import { loginSuccess, logoutSuccess } from '@features/user/userSlice';
import { Session } from '@supabase/supabase-js';

export const useAuthStateChange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAuthChange = async (session: Session | null) => {
      if (!session) {
        dispatch(logoutSuccess());
        return;
      }

      const providerType = session.user.app_metadata.provider;
      const isSocialLogin = providerType === 'kakao';

      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('username, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (userError) {
        console.error('Error fetching user table:', userError);
        return;
      }

      let avatarUrl: string | undefined;

      if (
        userData?.avatar_url === null &&
        session.user.user_metadata?.avatar_url
      ) {
        avatarUrl = session.user.user_metadata.avatar_url;
      } else {
        avatarUrl = userData?.avatar_url || '';
      }

      dispatch(
        loginSuccess({
          id: session.user.id,
          username: userData?.username || '',
          email: session.user.email ?? undefined,
          avatarUrl,
          isSocialLogin,
        }),
      );
    };

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      await handleAuthChange(session);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_, session) => {
          await handleAuthChange(session);
        },
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, [dispatch]);
};
