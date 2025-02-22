import { Theme } from '@mui/material';

export const bookDetailDialogStyles = {
  bookPreview: {
    width: '100%',
    height: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '1rem',
    boxSizing: 'border-box',
  },
  bookCard: {
    width: '100%',
    display: 'flex !important',
    flexDirection: 'row !important',
    padding: '1rem',
    height: '120px',
    boxShadow: 'none',
    '& .MuiCardMedia-root': {
      width: '100px',
      height: '100%',
      padding: 'auto',
      borderRadius: '0',
    },
    '& .MuiCardContent-root': {
      flex: 1,
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },
    '& .MuiTypography-body2': {
      fontSize: '11px',
    },
  },
  mainButtonStack: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    mt: 1,
    mb: 2,
  },
  mainButton: (theme: Theme) => ({
    fontSize: '14px',
    p: 1.5,
    flex: 1,
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: 'none',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  }),
  readingStatusBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 1.5,
    boxSizing: 'border-box',
    height: '6vh',
  },
  readingStatus: {
    width: '40%',
    justifyContent: 'space-between',
    '& .MuiToggleButton-root': {
      width: '30px',
      height: '30px',
      minWidth: '30px',
      borderRadius: '50%',
      padding: '5px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      '&[value="want"].Mui-selected': {
        backgroundColor: '#90A595',
        color: 'white',
        '&:hover': {
          backgroundColor: '#7A8F7F',
        },
      },
      '&[value="reading"].Mui-selected': {
        backgroundColor: '#D4A088',
        color: 'white',
        '&:hover': {
          backgroundColor: '#BF8A72',
        },
      },
      '&[value="done"].Mui-selected': {
        backgroundColor: '#9B8AA6',
        color: 'white',
        '&:hover': {
          backgroundColor: '#857491',
        },
      },
    },
  },
  subButtons: (theme: Theme) => ({
    height: '6vh',
    justifyContent: 'flex-start',
    px: 2,
    py: 1.5,
    border: 'none',
    borderRadius: 0,
    bgcolor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      border: 'none',
    },
  }),
};
