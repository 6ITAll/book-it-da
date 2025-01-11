export const bookShelvesStyles = {
  container: {
    p: 3,
  },
  filterViewBox: {
    display: 'flex',
    gap: 2,
    mb: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookGridContainer: {
    alignItems: 'flex-end',
    mt: 2,
  },
  bookGridItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
  },
  bookShelfHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 3,
    gap: '0.5rem',
  },
  sortSelector: {
    backgroundColor: '#fafafa',
    color: '#333',
    borderRadius: '16px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  sortMenus: {
    fontSize: '12px',
  },
};
