import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// SortOption 타입 정의
export type SortOption =
  | 'SortAccuracy'
  | 'CustomerRating'
  | 'SalesPoint'
  | 'PublishTime';

export interface BookSearchState {
  searchQuery: string; // 검색어
  currentPage: number; // 현재 페이지
  sortOption: SortOption; // 정렬 옵션
}

// 초기 상태 정의
const initialState: BookSearchState = {
  searchQuery: '',
  currentPage: 1,
  sortOption: 'SortAccuracy', // 기본 정렬: 관련도순
};

// 페이지 리셋 함수 정의
const resetPage = (state: BookSearchState) => {
  state.currentPage = 1;
};

// Slice 생성
export const bookSearchSlice = createSlice({
  name: 'bookSearch',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      resetPage(state); // 페이지 리셋 함수 호출
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
      resetPage(state); // 페이지 리셋 함수 호출
    },
  },
});

export const { setSearchQuery, setCurrentPage, setSortOption } =
  bookSearchSlice.actions;

export default bookSearchSlice.reducer;
