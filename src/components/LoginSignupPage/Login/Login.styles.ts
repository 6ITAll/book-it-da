import { styled } from '@mui/material/styles';
import { Button, IconButton, Typography, TypographyProps } from '@mui/material';

export const StyledButton = styled(Button)({
  padding: 0,
  minWidth: 'auto',
  '&:hover': {
    opacity: 0.8,
  },
});

export const SignupButton = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline',
  }),
);

export const StyledKakaoButton = styled(IconButton)({
  width: 40,
  height: 40,
  borderRadius: '8px',
  padding: 0,
  backgroundColor: '#FEE500',
  border: '1px solid lightgrey',
  boxSizing: 'border-box',
  '&:hover': {
    backgroundColor: '#E5D500',
  },
});

export const loginStyles = {
  loginButton: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: '5px',
  },
  snsLoginBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
};
