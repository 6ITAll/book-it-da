import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../utils/supabaseClient';
import { loginSuccess, logoutSuccess } from '@features/user/userSlice';
import { Session } from '@supabase/supabase-js';

export const useAuthStateChange = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let authListener: { subscription: { unsubscribe: () => void } };
    let isMounted = true;
    let lastSessionId: string | null = null;

    const handleAuthChange = async (session: Session | null) => {
      if (!isMounted) return;

      try {
        // 세션이 없는 경우만 로그아웃 처리
        if (!session) {
          dispatch(logoutSuccess());
          return;
        }

        if (lastSessionId === session.user.id) {
          return;
        }
        lastSessionId = session.user.id;

        // 세션이 있는 경우에만 사용자 정보 조회
        const { data: userData, error: userError } = await supabase
          .from('user')
          .select('username, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (userError) {
          console.error('User data fetch error:', userError);
          return;
        }

        const providerType = session.user.app_metadata.provider;
        const isSocialLogin = providerType === 'kakao';

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
      } catch (error) {
        console.error('Auth state change error:', error);
      }
    };

    // 초기 세션 체크 및 이벤트 리스너 설정
    const initializeAuth = async () => {
      try {
        // 현재 세션 가져오기
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          await handleAuthChange(session);
        }

        // 인증 상태 변경 리스너
        const { data: listener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_OUT') {
              lastSessionId = null;
              dispatch(logoutSuccess());
            } else if (
              ['SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(
                event,
              ) &&
              session
            ) {
              await handleAuthChange(session);
            }
          },
        );
        authListener = listener;
      } catch (error) {
        console.error('Initialize auth error:', error);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch]);
};
