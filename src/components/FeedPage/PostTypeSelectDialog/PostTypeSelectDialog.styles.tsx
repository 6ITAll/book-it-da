import { Theme } from '@mui/material';
const styles = {
  postTypeButton: (theme: Theme) => ({
    py: 2,
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // 배경색 제거
    color: theme.palette.text.primary,
    border: 'none',
    '&:hover': {
      backgroundColor: '#e0e0e0', // hover 시 배경색
      color: '#000',
      border: 'none', // hover 시에도 테두리 제거
    },
    '& .MuiButton-startIcon': {
      mr: 1,
    },
  }),
} as const;

export default styles;
