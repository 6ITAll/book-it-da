import { styled } from '@mui/material/styles';
import { Box, Button, BoxProps, Container } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '600px', // maxWidth="sm"에 해당
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
}));

export const FormContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}));

export const SubmitButton = styled(Button)(() => ({
  marginTop: '16px',
}));

export const CheckDuplicateButton = styled(Button)(() => ({
  marginTop: '16px',
  whiteSpace: 'nowrap',
  minWidth: 'auto',
  padding: '6px 12px',
  borderRadius: '4px',
}));
