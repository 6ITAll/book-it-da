import ReactDOM from 'react-dom';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '@features/Snackbar/snackbarSlice';
import { RootState } from '@store/index';

const SnackBar = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { message, severity } = useSelector(
    (state: RootState) => state.snackbar,
  );

  const handleClose = () => {
    dispatch(hideSnackbar()); // 스낵바 닫기 액션 디스패치
  };

  if (!message) return null;

  return ReactDOM.createPortal(
    <MuiSnackbar
      open={!!message}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>,
    document.getElementById('snackbar-root')!,
  );
};

export default SnackBar;
