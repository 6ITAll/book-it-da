import { Theme } from '@mui/material';
const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    aspectRatio: 'auto',
    borderRadius: '8px',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  },
  cardHeader: {
    display: 'flex',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    '& .MuiCardHeader-action': {
      margin: 0,
      alignSelf: 'center',
    },
  },
  followButton: (isFollowing: boolean) => (theme: Theme) => ({
    color: isFollowing
      ? theme.palette.getContrastText(theme.palette.secondary.main)
      : theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: isFollowing
      ? theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark
      : theme.palette.mode === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    border: 'none',
    mb: '0',
    '&:hover': {
      backgroundColor: isFollowing
        ? theme.palette.mode === 'light'
          ? theme.palette.secondary.dark
          : theme.palette.secondary.main
        : theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
  }),
  postInfoBox: {
    display: 'flex',
    fontSize: '11px',
    gap: '5px',
  },
  cardMediaBox: {
    position: 'relative',
    height: '60%',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: '#000',
    zIndex: 1,
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(10px) brightness(0.5)',
    transform: 'scale(1.1)',
  },
  bookImageBox: {
    position: 'relative',
    width: '70%',
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  bookImage: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    aspectRatio: '2/3',
    zIndex: 3,
    transform: 'scale(0.7)',
  },
  cardContent: {
    width: '100%',
    maxWidth: '100%',
    padding: '1rem 1rem 0.5rem 1rem',
    height: '20%',
    borderRadius: '8px 8px 0px 0px',
    position: 'relative',
    zIndex: 2,
    boxSizing: 'border-box',
  },
  cardTitleBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  bookAuthor: {
    fontSize: '12px',
    fontWeight: '300',
  },
  cardDescriptionBox: {
    width: '100%',
    boxSizing: 'border-box',
  },
  cardSentence: {
    padding: '1rem 0',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  postingDescription: {
    height: 'auto',
    padding: '0.25rem 0.5rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 6,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-all',
    lineHeight: '20px',
  },
  cardFooter: {
    padding: '0',
    height: '10%',
    borderTop: '1px solid #ddd',
    gap: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    boxSizing: 'border-box',
  },
  cardFooterButton: (isLeft: boolean) => (theme: Theme) => ({
    padding: '0.7rem 0',
    width: '100%',
    height: '100%',
    borderRadius: isLeft ? '0px 0px 0px 8px' : '0px 0px 8px 0px',
    borderRight: isLeft ? '1px solid #ddd' : 'none',
    bgcolor: theme.palette.background.paper,
    color: theme.palette.text.primary, // 테마의 텍스트 색상 사용
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e0e0e0', // hover 시 배경색 변경
      color: '#000',
    },
  }),
};

export default styles;
