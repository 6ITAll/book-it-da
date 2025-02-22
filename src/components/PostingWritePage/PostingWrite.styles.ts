import { Theme } from '@mui/material';

export const postingWriteStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '0 !important',
    margin: '0 !important',

    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',

    borderTop: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  header: (theme: Theme) => ({
    width: '100%',
    position: 'sticky',
    opacity: '0.9',
    top: 0,
    bgcolor: theme.palette.background.paper,
    zIndex: 1000,
    borderBottom: '1px solid #eee',
    py: 2,
    px: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  }),
  postingToolbar: (theme: Theme) => ({
    width: '100%',
    padding: '0.5rem 1rem',
    boxSizing: 'border-box',
    bgcolor: theme.palette.background.paper,
    borderBottom: '1px solid #ccc',
    flex: '0 0 auto',
  }),
  postingSaveBox: {
    display: 'flex',

    borderRadius: '4px',
    overflow: 'hidden',
  },
  postingSaveButton: {
    fontSize: '11px',
    color: '#333',
    backgroundColor: '#ddd',
    borderRadius: '4px 0px 0px 4px',
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
  },
  postingLoadButton: {
    fontSize: '11px',
    color: '#333',
    backgroundColor: '#ddd',
    minWidth: '30px',
    borderRadius: '0px 4px 4px 0px',
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
  },
  postingMaterialButton: {
    fontSize: '11px',
    backgroundColor: '#ddd',
    color: '#333',
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
  },
  bookSearchBox: {
    p: 2,
    width: {
      xs: '250px',
      md: '300px',
    },
  },
  posting: (theme: Theme) => ({
    width: {
      xs: '100%',
      md: '50%',
    },
    padding: {
      xs: '0 1rem 1rem 1rem',
      md: '0',
    },
    bgcolor: theme.palette.background.paper,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
  }),
  bookPreviewBox: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '1rem',
    padding: '0',
  },
  bookCard: {
    width: '100%',
    display: 'flex !important',
    flexDirection: 'row !important',
    backgroundColor: 'transparent',
    padding: '1rem',
    height: '120px',
    cursor: 'default',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
    '& .MuiCardMedia-root': {
      width: '100px',
      height: '100%',
      padding: 'auto',
      borderRadius: '0',
    },
    '& .MuiCardContent-root': {
      flex: 1,
      padding: '0.1rem',
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
  postingTitle: {
    '& .MuiOutlinedInput-root': {
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      '& input': {
        textAlign: 'center',
        fontSize: '24px',
        padding: 0,
      },
      '& fieldset': {
        border: 'none',
        borderRadius: 0,
        borderBottom: '1px solid #ccc',
      },
      '&:hover fieldset': {
        border: 'none',
        borderBottom: '1px solid #ccc',
      },
      '&.Mui-focused fieldset': {
        border: 'none !important',
        borderBottom: '1px solid #ccc !important',
      },
    },
    '& input::placeholder': {
      textAlign: 'center',
      opacity: 0.4,
    },
  },
  postingContentBox: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  savedPostingBox: {
    cursor: 'pointer',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
  },
};
