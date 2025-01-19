import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, setToken } from '@features/user/userSlice';
import { supabase } from '@utils/supabaseClient';

const KakaoCallback: React.FC = () => {
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

          // 카카오 사용자 정보 가져오기
          const { data: userData, error: userError } =
            await supabase.auth.getUser();

          if (userError) throw userError;

          if (userData?.user?.user_metadata) {
            const { avatar_url } = userData.user.user_metadata;

            // avatar_url 업데이트
            if (avatar_url) {
              const { error: updateError } = await supabase
                .from('user')
                .update({ avatar_url: avatar_url })
                .eq('id', user.id);

              if (updateError) throw updateError;
            }
          }

          dispatch(loginSuccess({ id: user.id }));
          dispatch(setToken(access_token));
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
