import { Theme } from '@mui/material';

export const postingDetailStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '0 !important',
    margin: '0 !important',
    boxSizing: 'border-box',
  },
  posting: (theme: Theme) => ({
    px: 4,
    pt: 3,
    width: {
      xs: '100%',
      md: '50%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: theme.palette.background.paper,
    boxSizing: 'border-box',
  }),
  postingHeader: (theme: Theme) => ({
    width: '100%',
    position: 'sticky',
    opacity: '0.9',
    top: 0,
    bgcolor: theme.palette.background.paper,
    zIndex: 1000,
    borderBottom: '1px solid #eee',
    py: 2,
    px: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  }),
  likeCount: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
  userInfoBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 1,
    mb: 3,
    width: '100%',
    borderBottom: '1px solid #eee',
  },
  bookPreviewBox: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '1rem',
    padding: '0',
  },
  bookCard: {
    width: '100%',
    display: 'flex !important',
    flexDirection: 'row !important',
    backgroundColor: 'transparent',
    padding: '1rem',
    height: '140px',
    '& .MuiCardMedia-root': {
      width: '80px',
      height: '100%',
      padding: 'auto',
      borderRadius: '0',
    },
    '& .MuiCardContent-root': {
      flex: 1,
      padding: '0.1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxSizing: 'border-box',
    },
    '& .MuiTypography-body1': {
      fontSize: '14px',
    },
    '& .MuiTypography-body2': {
      fontSize: '11px',
    },
  },
  otherPostingBox: {
    width: '100%',
    my: 5,
    px: 4,
    boxSizing: 'border-box',
  },
  otherPostingTitle: {
    mb: 2,
    fontWeight: 'bold',
  },
  userInfoBoxButton: (isFollowing: boolean | undefined) => (theme: Theme) => ({
    color: theme.palette.common.white, // 텍스트 색상 고정
    backgroundColor: isFollowing
      ? theme.palette.mode === 'light'
        ? theme.palette.secondary.light // 팔로잉: 라이트 모드 밝은 보라색
        : theme.palette.secondary.dark // 팔로잉: 다크 모드 어두운 보라색
      : theme.palette.mode === 'light'
        ? theme.palette.primary.light // 팔로우: 라이트 모드 밝은 파란색
        : theme.palette.primary.main, // 팔로우: 다크 모드 기본 파란색
    '&:hover': {
      backgroundColor: isFollowing
        ? theme.palette.mode === 'light'
          ? theme.palette.secondary.dark // 팔로잉 호버: 라이트 모드 어두운 보라색
          : theme.palette.secondary.main // 팔로잉 호버: 다크 모드 기본 보라색
        : theme.palette.mode === 'light'
          ? theme.palette.primary.main // 팔로우 호버: 라이트 모드 기본 파란색
          : theme.palette.primary.dark, // 팔로우 호버: 다크 모드 어두운 파란색
    },
    borderRadius: 2,
    padding: '4px 12px',
  }),
};
