import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '@features/Snackbar/SnackbarSlice';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
