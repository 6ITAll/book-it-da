import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookshelvesState } from '../types/types';
import { SortOption, ViewMode } from '@components/BookShelvesPage/types';

const initialState: BookshelvesState = {
  viewMode: 'grid',
  sortOption: 'recent',
};

export const bookShelvesSlice = createSlice({
  name: 'bookshelves',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setViewMode, setSortOption } = bookShelvesSlice.actions;
export default bookShelvesSlice.reducer;
