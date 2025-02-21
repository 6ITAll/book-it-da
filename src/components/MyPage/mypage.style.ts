import { Theme } from '@mui/material';

const userInfoStyles = {
  userInfoButtonFollowing: (theme: Theme) => ({
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.background.paper,
    },
  }),
  userInfoButtonFollower: (theme: Theme) => ({
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.background.paper,
    },
  }),
};

export default userInfoStyles;
