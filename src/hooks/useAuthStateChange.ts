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
        dispatch(
          loginSuccess({
            id: session.user.id,
            email: session.user.email ?? undefined,
            avatarUrl: session.user.user_metadata.avatar_url,
          }),
        );
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          dispatch(
            loginSuccess({
              id: session.user.id,
              email: session.user.email ?? undefined,
              avatarUrl: session.user.user_metadata.avatar_url,
            }),
          );
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
