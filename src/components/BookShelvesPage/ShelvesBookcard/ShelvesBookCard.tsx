import { Box, Typography, CardMedia, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDate } from 'src/utils/dateUtils';
import { BookCard } from './ShelvesBookCard.styles';

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
