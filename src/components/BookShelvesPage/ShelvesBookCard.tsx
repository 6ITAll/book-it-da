import {
  Box,
  Typography,
  Card,
  CardMedia,
  styled,
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDate } from 'src/utils/dateUtils';

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
    border: '1px solid red',
  },
  // 리스트일 때
  ...(view === 'list' && {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    marginBottom: '16px',
    gap: '10px',
    '& .MuiCardMedia-root': {
      width: '133px',
      position: 'relative',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    '& .book-info': {
      width: '60%',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }),
  // 그리드일 때
  ...(view === 'grid' && {
    display: 'flex',
    flexDirection: 'column',
    '& .book-cover': {
      position: 'relative',
      marginBottom: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
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
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="subtitle1" noWrap sx={{ flex: 1 }}>
                {book.bookTitle}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => onMenuOpen(e, book.id)}
                sx={{ ml: 1 }}
              >
                <MoreVert />
              </IconButton>
            </Box>
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
                  {formattedDate}
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
          </Box>
        </>
      )}
    </BookCard>
  );
};

export default ShelvesBookCard;
