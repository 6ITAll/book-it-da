import ReactDOM from 'react-dom';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { SnackbarMessage } from './SnackbarContext';

interface SnackBarProps {
  message: SnackbarMessage;
  setMessage: (message: SnackbarMessage) => void;
}

const SnackBar = ({
  message,
  setMessage,
}: SnackBarProps): JSX.Element | null => {
  const handleClose = () => {
    setMessage({ message: '', severity: 'info' });
  };

  if (!message.message) return null;

  return ReactDOM.createPortal(
    <MuiSnackbar
      open={!!message.message}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={message.severity}>
        {message.message}
      </Alert>
    </MuiSnackbar>,
    document.getElementById('snackbar-root')!,
  );
};

export default SnackBar;
