import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookSearchState {
  searchQuery: string; // 검색어
  currentPage: number; // 현재 페이지
  sortOption: string; // 정렬 옵션
}

const initialState: BookSearchState = {
  searchQuery: '',
  currentPage: 1,
  sortOption: 'SortAccuracy', // 기본 정렬: 관련도순
};

export const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // 새 검색 시 페이지 초기화
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
      state.currentPage = 1; // 정렬 변경 시 페이지 초기화
    },
  },
});

export const { setSearchQuery, setCurrentPage, setSortOption } =
  bookSearchSlice.actions;

export default bookSearchSlice.reducer;
