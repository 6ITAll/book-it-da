import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  useTheme,
  Divider,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDate } from '@shared/utils/dateUtils';
import { BookCard, shelvesBookCardStyles } from './ShelvesBookCard.styles';
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
  const theme = useTheme();

  return (
    <>
      <BookCard
        view={view}
        sx={{
          padding: view === 'grid' ? '0' : '1rem 0',
        }}
      >
        {view === 'grid' ? (
          <>
            <Box className="book-cover" margin="0 !important">
              <CardMedia
                component="img"
                image={book.imageUrl}
                alt={book.bookTitle}
              />
              <Box sx={shelvesBookCardStyles.gridReadingStatusIconBox}>
                {renderReadingStatusIcon(book.readingStatus)}
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: theme.palette.background.default,
                padding: '0.5rem 0',
              }}
            >
              <Box sx={shelvesBookCardStyles.gridBookTitleBox}>
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
              <Box>
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
            <Box className="book-info" sx={{ padding: '1rem 1rem !important' }}>
              <Box sx={shelvesBookCardStyles.listBookCardContent}>
                <Box sx={shelvesBookCardStyles.listBookInfoBox}>
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
                    sx={shelvesBookCardStyles.listBookDetailButton}
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
                >
                  <MoreVert />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </BookCard>
      {view === 'list' && (
        <Divider sx={{ width: '60%', margin: '0 auto', mt: 2 }} />
      )}
    </>
  );
};

export default ShelvesBookCard;
