import {
  Box,
  Typography,
  Card,
  CardMedia,
  Button,
  styled,
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDate } from 'src/utils/dateutils';

interface BookCardProps {
  book: {
    id: number;
    bookTitle: string;
    author: string;
    imageUrl: string;
    savedAt: string;
  };
  view: 'grid' | 'list';
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, bookId: number) => void;
}

const BookCard = styled(Card)<{ view: 'grid' | 'list' }>(({ view }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover .book-actions': {
    opacity: 1,
  },
  ...(view === 'list' && {
    display: 'flex',
    height: '200px',
    marginBottom: '16px',
    '& .MuiCardMedia-root': {
      width: '133px',
      position: 'relative',
    },
    '& .book-info': {
      flex: 1,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }),
  ...(view === 'grid' && {
    display: 'flex',
    flexDirection: 'column',
    '& .book-cover': {
      position: 'relative',
      aspectRatio: '2/3',
      marginBottom: '12px',
      '& .MuiCardMedia-root': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    '& .kebab-menu': {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.3)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    },
  }),
}));

const BookActions = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0,0,0,0.7)',
  padding: '8px',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
});

const ShelvesBookCard = ({ book, view, onMenuOpen }: BookCardProps) => {
  const formattedDate = formatDate(book.savedAt);
  return (
    <BookCard view={view}>
      {view === 'grid' ? (
        <>
          <Box className="book-cover">
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.bookTitle}
            />
            <IconButton
              className="kebab-menu"
              size="small"
              onClick={(e) => onMenuOpen(e, book.id)}
              sx={{ backgroundColor: 'transparent' }}
            >
              <MoreVert />
            </IconButton>
            <BookActions className="book-actions">
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>
                바로 읽기
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ color: 'white', borderColor: 'white' }}
              >
                더보기
              </Button>
            </BookActions>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" noWrap>
              {book.bookTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.author}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              {formattedDate}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            image={book.imageUrl}
            alt={book.bookTitle}
          />
          <Box className="book-info">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Typography variant="h6" noWrap>
                  {book.bookTitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  저장: {new Date(book.savedAt).toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => onMenuOpen(e, book.id)}
                sx={{ backgroundColor: 'transparent' }}
              >
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained">바로 읽기</Button>
              <Button variant="outlined">더보기</Button>
            </Box>
          </Box>
        </>
      )}
    </BookCard>
  );
};

export default ShelvesBookCard;
