import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, setToken } from '@features/user/userSlice';
import { supabase } from '@utils/supabaseClient';

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

          const { data: userData, error: userError } =
            await supabase.auth.getUser();

          if (userError) throw userError;

          let avatar_url: string | undefined;

          if (userData?.user?.user_metadata) {
            avatar_url = userData.user.user_metadata.avatar_url;

            if (avatar_url) {
              const { error: updateError } = await supabase
                .from('user')
                .update({ avatar_url: avatar_url })
                .eq('id', user.id);

              if (updateError) throw updateError;
            }
          }

          dispatch(
            loginSuccess({
              id: user.id,
              email: user.email,
              avatarUrl: avatar_url,
            }),
          );
          dispatch(setToken(access_token));

          const { data: userProfile, error: profileError } = await supabase
            .from('user')
            .select('username, gender, age')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          if (
            !userProfile?.username ||
            !userProfile?.gender ||
            !userProfile?.age
          ) {
            navigate('/kakao/additional-info');
            return;
          }

          navigate('/');
        } else {
          throw new Error('세션 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, dispatch]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
