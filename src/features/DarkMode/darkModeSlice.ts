import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark';
}

// localStorage에 저장된 테마 값 불러오기
const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark' | null;

const initialState: ThemeState = {
  mode: savedTheme || 'light', // 저장된 값이 없으면 기본 'light' 사용
};

const darkModeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // 상태 변경 시 localStorage에도 저장
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { toggleTheme } = darkModeSlice.actions;
export default darkModeSlice.reducer;
