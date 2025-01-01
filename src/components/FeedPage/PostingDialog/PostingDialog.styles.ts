export const styles = {
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderTop: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  postingToolbar: {
    width: '100%',
    padding: '0.5rem 1rem',
    boxSizing: 'border-box',
    backgroundColor: '#fcfcfc',
    borderBottom: '1px solid #ccc',
    flex: '0 0 auto',
  },
  postingSaveBox: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
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
  posting: {
    width: {
      xs: '100%',
      md: '50%',
    },
    padding: {
      xs: '0 1rem 1rem 1rem',
      md: '0',
    },
    backgroundColor: '#fcfcfc',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
  },
  bookPreviewBox: {
    width: '90%',
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
    height: '60px',
    '& .MuiCardMedia-root': {
      width: '80px',
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
};
