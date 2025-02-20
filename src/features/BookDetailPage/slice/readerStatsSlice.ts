import { ReaderStats } from '@components/BookDetailPage/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const defaultReaderStats: ReaderStats = {
  isbn: '',
  totalCollectors: 0,
  demographics: {
    gender: {
      male: {
        '10s': 0,
        '20s': 0,
        '30s': 0,
        '40s': 0,
        '50s': 0,
        '60plus': 0,
        'unknown': 0,
      },
      female: {
        '10s': 0,
        '20s': 0,
        '30s': 0,
        '40s': 0,
        '50s': 0,
        '60plus': 0,
        'unknown': 0,
      },
      unknown: 0,
    },
  },
};

const readerStatsSlice = createSlice({
  name: 'readerStats',
  initialState: defaultReaderStats,
  reducers: {
    setReaderStats: (_, action: PayloadAction<ReaderStats>) => {
      return action.payload;
    },
    clearReaderStats: () => {
      return defaultReaderStats;
    },
  },
});

export const { setReaderStats, clearReaderStats } = readerStatsSlice.actions;
export default readerStatsSlice.reducer;
