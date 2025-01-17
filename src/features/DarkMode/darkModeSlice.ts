// store/darkModeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'light', // 기본 테마는 'light'
};

const darkModeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = darkModeSlice.actions;
export default darkModeSlice.reducer;
