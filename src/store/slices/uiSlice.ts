import darkModeReducer from '@features/DarkMode/darkModeSlice';
import snackbarReducer from '@features/Snackbar/snackbarSlice';

export const uiReducers = {
  darkMode: darkModeReducer,
  snackbar: snackbarReducer,
};
