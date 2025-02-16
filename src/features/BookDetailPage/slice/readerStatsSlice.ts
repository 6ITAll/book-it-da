import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 추후 components/BookDetailPage/types.ts 로
export type AgeGroup =
  | '10s'
  | '20s'
  | '30s'
  | '40s'
  | '50s'
  | '60plus'
  | 'unknown';
// 타입 추후 components/BookDetailPage/types.ts 로
export interface Demographics {
  gender: {
    male: Record<AgeGroup, number>;
    female: Record<AgeGroup, number>;
    unknown: number;
  };
}
// 타입 추후 components/BookDetailPage/types.ts 로
export interface ReaderStats {
  isbn: string;
  totalCollectors: number;
  demographics: Demographics;
}

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
