import { Box, Typography, CardMedia, IconButton, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDate } from 'src/utils/dateUtils';
import { BookCard } from './ShelvesBookCard.styles';
import { SavedBook } from '@shared/types/type';
import {
  renderReadingStatus,
  renderReadingStatusIcon,
} from 'src/utils/BookShelvesPage/readingStatusUtils';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: SavedBook;
  view: 'grid' | 'list';
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, bookId: number) => void;
}

const ShelvesBookCard = ({ book, view, onMenuOpen }: BookCardProps) => {
  const formattedDate = formatDate(book.savedAt);
  const navigate = useNavigate();

  return (
    <BookCard
      view={view}
      sx={{
        borderRadius: '0 !important',
        width:
          view === 'list'
            ? {
                xs: '100%',
                lg: '60%',
              }
            : '100%',
        alignSelf: view === 'list' ? 'center' : 'none',
      }}
    >
      {view === 'grid' ? (
        <>
          <Box className="book-cover">
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.bookTitle}
            />
            <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
              {renderReadingStatusIcon(book.readingStatus)}
            </Box>
          </Box>
          <Box>
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
                onClick={(e) => onMenuOpen(e, book.itemId)}
                sx={{ ml: 1 }}
              >
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{}}>
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
          </Box>
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            image={book.imageUrl}
            alt={book.bookTitle}
          />
          <Box className="book-info" sx={{ padding: '0 1rem !important' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {renderReadingStatus(book.readingStatus)}
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
                <Button
                  sx={{ width: '120px', bgcolor: '#333', color: '#fafafa' }}
                  onClick={() =>
                    navigateToBookDetailPage(navigate, book.itemId)
                  }
                >
                  책 보러 가기
                </Button>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => onMenuOpen(e, book.itemId)}
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
