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

export const bestBookStyles = {
  commonCard: {
    borderRadius: 0,
    boxShadow: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    '& .MuiCardMedia-root': {
      height: { xs: 100, sm: 150, md: 200 }, // 반응형 높이 조절
      padding: '0.5rem 0',
      width: 'auto',
    },
    '& .MuiCardContent-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '8px',
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '8px',
    },
  },
  bestBookSkeletonBox: {
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bestBookSkeltonCard: {
    borderRadius: 2,
    height: { xs: 150, sm: 200, md: 250 }, // 반응형 높이
    width: '22%', // Carousel의 개별 슬라이드 너비와 일치
  },
};
