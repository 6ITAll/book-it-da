import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 상태 타입
export interface BookDetailState {
  isbn: string;
  title: string;
  description: string;
  author: string;
  categoryName: string;
  pubDate: string;
  cover: string;
  link: string;
  subTitle: string;
}

// 초기 상태
const initialState: BookDetailState = {
  isbn: '',
  title: '',
  description: '',
  author: '',
  categoryName: '',
  pubDate: '',
  cover: '',
  link: '',
  subTitle: '',
};

export const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState,
  reducers: {
    setBookDetail: (_, action: PayloadAction<BookDetailState>) => {
      return action.payload;
    },
    resetBookDetail: () => initialState,
  },
});

export const { setBookDetail, resetBookDetail } = bookDetailSlice.actions;

export default bookDetailSlice.reducer;
