import React, { useState } from 'react';
import SnackBar from './SnackBar';
import SnackbarContext, { SnackbarMessage } from './SnackbarContext';
import { AlertColor } from '@mui/material';

interface SnackBarProviderProps {
  children: React.ReactNode;
}

const SnackBarProvider = ({ children }: SnackBarProviderProps): JSX.Element => {
  const [snackBarMessage, setSnackBarMessage] = useState<SnackbarMessage>({
    message: '',
    severity: 'info',
  });

  const setSnackBar = (message: string, severity: AlertColor = 'info') => {
    setSnackBarMessage({ message, severity });
  };

  return (
    <SnackbarContext.Provider value={{ setSnackBar }}>
      {children}
      <SnackBar message={snackBarMessage} setMessage={setSnackBarMessage} />
    </SnackbarContext.Provider>
  );
};

export default SnackBarProvider;
