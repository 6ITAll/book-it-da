import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const StyledHeaderContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledLogo = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontSize: '24px',
  fontWeight: 'bold',
}));

export const StyledSearchContainer = styled(Box)({
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center',
});

export const StyledIconWrapper = styled('div')({
  cursor: 'pointer',
});
