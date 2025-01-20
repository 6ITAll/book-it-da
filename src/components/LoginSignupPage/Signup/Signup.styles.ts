import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  alignSelf: 'center',
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const signupStyles = {
  checkDuplicateButton: {
    whiteSpace: 'nowrap',
    minWidth: 'auto',
    padding: '6px 12px',
    borderRadius: '4px',
  },
};
