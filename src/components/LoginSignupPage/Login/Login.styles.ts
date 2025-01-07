import { styled } from '@mui/material/styles';
import { Button, Typography, TypographyProps } from '@mui/material';

export const StyledButton = styled(Button)({
  padding: 0,
  minWidth: 'auto',
  '&:hover': {
    opacity: 0.8,
  },
});

export const StyledTypography = styled(Typography)<TypographyProps>({
  color: 'primary.main',
  cursor: 'pointer',
  display: 'inline',
});
