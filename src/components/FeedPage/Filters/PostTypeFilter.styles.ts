import { Theme } from '@mui/material/styles';

const styles = {
  filterButton: (theme: Theme, isSelected: boolean) => ({
    fontSize: '12px',
    padding: '5px 10px',
    minWidth: '80px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
    color: isSelected
      ? theme.palette.getContrastText(theme.palette.primary.main)
      : theme.palette.text.primary,
    borderColor: isSelected ? 'transparent' : theme.palette.divider,
    '&:hover': {
      backgroundColor: isSelected
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
    },
  }),
};

export default styles;
