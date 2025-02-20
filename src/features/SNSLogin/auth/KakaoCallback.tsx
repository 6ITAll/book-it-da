import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, setToken } from '@features/user/userSlice';
import { supabase } from '@utils/Supabase/supabaseClient';
import {
  navigateToAdditionalInfoPage,
  navigateToLoginPage,
  navigateToMainPage,
} from '@shared/utils/navigation';

const KakaoCallback = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getSession();

        if (authError) throw authError;

        if (authData?.session) {
          const { user, access_token } = authData.session;

          // Supabase에서 현재 사용자 정보 가져오기
          const { data: userData, error: currentUserError } = await supabase
            .from('user')
            .select('username, avatar_url')
            .eq('id', user.id)
            .single();

          if (currentUserError) throw currentUserError;

          let avatar_url: string | undefined = userData?.avatar_url; // Supabase의 avatar_url 값

          // 카카오톡 메타데이터에서 avatar_url 가져오기
          const { data: kakaoUserData, error: userError } =
            await supabase.auth.getUser();

          if (userError) throw userError;

          // Supabase의 avatar_url이 없을 때만 카카오톡 메타데이터 값 적용
          if (avatar_url === null && user.user_metadata?.avatar_url) {
            avatar_url = kakaoUserData.user.user_metadata.avatar_url;

            // Supabase의 avatar_url 업데이트
            const { error: updateError } = await supabase
              .from('user')
              .update({ avatar_url })
              .eq('id', user.id);

            if (updateError) throw updateError;
          }

          // Redux 상태 업데이트
          dispatch(
            loginSuccess({
              id: user.id,
              username: userData?.username ?? '',
              email: user.email,
              avatarUrl: avatar_url || '', // Redux 상태에 Supabase의 avatar_url 값 설정
              isSocialLogin: true,
            }),
          );
          dispatch(setToken(access_token));

          // 추가 정보 확인
          const { data: userProfile, error: profileError } = await supabase
            .from('user')
            .select('username, gender, birth_date')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          if (
            !userProfile?.username ||
            !userProfile?.gender ||
            !userProfile?.birth_date
          ) {
            navigateToAdditionalInfoPage(navigate);
            return;
          }

          navigateToMainPage(navigate);
        } else {
          throw new Error('세션 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigateToLoginPage(navigate);
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
