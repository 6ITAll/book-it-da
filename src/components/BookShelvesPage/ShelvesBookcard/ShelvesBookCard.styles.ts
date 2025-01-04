import { Card, styled } from '@mui/material';

export const BookCard = styled(Card)<{ view: 'grid' | 'list' }>(({ view }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover .book-actions': {
    opacity: 1,
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
