import { createContext } from 'react';
import { AlertColor } from '@mui/material';

export interface SnackbarMessage {
  message: string;
  severity: AlertColor;
}

export interface SnackbarContextType {
  setSnackBar: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export default SnackbarContext;
