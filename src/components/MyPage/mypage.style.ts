import { Theme } from '@mui/material';

const userInfoStyles = {
  userInfoButtonFollowing: (theme: Theme) => ({
    color: '#fff',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark,
    mb: '0',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.secondary.dark
          : theme.palette.secondary.main,
    },
  }),
  userInfoButtonFollower: (theme: Theme) => ({
    color: '#fff',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    mb: '0',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
  }),
};

export default userInfoStyles;
