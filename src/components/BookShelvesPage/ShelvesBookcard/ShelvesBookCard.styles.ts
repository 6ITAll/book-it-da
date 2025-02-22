import { Card, styled } from '@mui/material';
import { ViewMode } from '../types';

export const shelvesBookCardStyles = {
  gridReadingStatusIconBox: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  gridBookTitleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listBookCardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  listBookInfoBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listBookDetailButton: {
    width: '120px',
  },
};

export const BookCard = styled(Card)<{ view: ViewMode }>(({ view, theme }) => ({
  position: 'relative',
  boxShadow: 'none',
  background: theme.palette.mode === 'dark' ? '#121212' : '#f9f9f9',
  '&:hover .book-actions': {
    opacity: 1,
  },
  borderRadius: '0 !important',
  width: '100%',
  alignSelf: view === 'list' ? 'center' : 'none',
  [theme.breakpoints.up('lg')]: {
    width: view === 'list' ? '60%' : '100%',
  },
  // 리스트일 때
  ...(view === 'list' && {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    marginBottom: '16px',
    gap: '10px',
    '& .MuiCardMedia-root': {
      width: '133px',
      position: 'relative',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    '& .book-info': {
      width: '60%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }),
  // 그리드일 때
  ...(view === 'grid' && {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '& .book-cover': {
      position: 'relative',
      marginBottom: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      '& .MuiCardMedia-root': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    '& .kebab-menu': {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    },
  }),
}));
