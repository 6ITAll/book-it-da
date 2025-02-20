import { Theme } from '@mui/material';
const styles = {
  postTypeButton: (theme: Theme) => ({
    py: 2,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    border: 'none',
    '&:hover': {
      backgroundColor: '#e0e0e0',
      color: '#000',
      border: 'none',
    },
    '& .MuiButton-startIcon': {
      mr: 1,
    },
  }),
} as const;

export default styles;
