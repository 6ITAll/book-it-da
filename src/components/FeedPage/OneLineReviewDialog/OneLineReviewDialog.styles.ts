export const styles = {
  dialogPaper: {
    '& .MuiDialog-paper': {
      borderRadius: '10px',
    },
  },
  contentStack: {
    gap: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: '1rem 0',
  },
  bookPreviewBox: {
    width: '100%',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCard: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    my: 1,
    '& .MuiCardMedia-root': {
      height: '100px',
      boxSizing: 'border-box',
      padding: '1rem',
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },
    '& .MuiTypography-body2': {
      fontSize: '11px',
    },
  },
  characterCount: {
    position: 'absolute',
    bottom: '8px',
    right: '14px',
    color: 'text.secondary',
  },
};
