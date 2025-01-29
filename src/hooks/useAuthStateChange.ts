import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../utils/supabaseClient';
import { loginSuccess, logoutSuccess } from '@features/user/userSlice';

export const useAuthStateChange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
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
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const providerType = session.user.app_metadata.provider;
          const isSocialLogin = providerType === 'kakao';

          supabase
            .from('user')
            .select('username, avatar_url')
            .eq('id', session.user.id)
            .single()
            .then(({ data: userData, error: userError }) => {
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
            });
        } else if (event === 'SIGNED_OUT') {
          dispatch(logoutSuccess());
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);
};
