import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/index';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';

const RequireAdditionalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userInfo || !userInfo.username) {
      dispatch(
        showSnackbar({
          message: '추가 정보를 입력해야 합니다.',
          severity: 'warning',
        }),
      );
      navigate('/kakao/additional-info'); // 추가 정보 페이지로 리다이렉트
    }
  }, [userInfo, dispatch, navigate]);

  return null;
};

export default RequireAdditionalInfo;
