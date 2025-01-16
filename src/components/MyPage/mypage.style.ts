import { Theme } from '@mui/material';

const userInfoStyles = {
  userInfoButtonFollowing: (theme: Theme) => ({
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200] // 라이트 모드에서는 밝은 색
          : theme.palette.background.paper, // 다크 모드에서는 기존 색 유지
    },
  }),
  userInfoButtonFollower: (theme: Theme) => ({
    color: theme.palette.text.primary,
    bgcolor: theme.palette.background.default,
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200] // 라이트 모드에서는 밝은 색
          : theme.palette.background.paper, // 다크 모드에서는 기존 색 유지
    },
  }),
};

export default userInfoStyles;
