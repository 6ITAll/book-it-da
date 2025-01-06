import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const initialState: SnackbarState = {
  message: '',
  severity: 'info',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<SnackbarState>) {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideSnackbar(state) {
      state.message = '';
      state.severity = 'info';
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
