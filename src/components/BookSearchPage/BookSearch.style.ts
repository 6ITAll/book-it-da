import { Theme } from '@mui/material';
export const bookSearchStyles = {
  bookSearchContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem',
    bgcolor: theme.palette.background.paper,
  }),
};

export const bookSearchBarStyles = {
  bookSearchBarBox: {
    boxSizing: 'border-box',
    mb: '2rem',
    mt: '1rem',
  },
  textfield: {
    width: '100%',
  },
};

export const searchResultStyles = {
  searchResultBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginY: 3,
  },
  totalSearchText: {
    color: '#2196f3',
    mx: 0.5,
  },
  searchResultListBox: {
    display: 'grid',
    boxSizing: 'border-box',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)', // 모바일에서 2열
      md: 'repeat(4, 1fr)', // 데스크톱에서 4열
    },
    gap: 2, // 카드 간격
  },
  paginationBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 4,
  },
};
