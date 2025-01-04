export const styles = {
  postTypeButton: {
    py: 2,
    justifyContent: 'space-between',
    bgColor: 'transparent',
    border: 'none',
    '&:hover': {
      bgColor: '#e0e0e0',
      border: 'none',
    },
    '& .MuiButton-startIcon': {
      mr: 1,
    },
  },
} as const;
