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
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';

interface BookCardProps {
  book: SavedBook;
  view: 'grid' | 'list';
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, isbn: string) => void;
}

const ShelvesBookCard = ({ book, view, onMenuOpen }: BookCardProps) => {
  const formattedDate = formatDate(book.addedAt);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: bookInfo } = useSearchBookByIsbnQuery({ isbn: book?.isbn });

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
                image={bookInfo?.cover}
                alt={bookInfo?.title}
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
                  {bookInfo?.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => onMenuOpen(e, book.isbn)}
                  sx={{ ml: 1 }}
                >
                  <MoreVert />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {bookInfo?.author}
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
              image={bookInfo?.cover}
              alt={bookInfo?.title}
            />
            <Box className="book-info" sx={{ padding: '1rem 1rem !important' }}>
              <Box sx={shelvesBookCardStyles.listBookCardContent}>
                <Box sx={shelvesBookCardStyles.listBookInfoBox}>
                  {renderReadingStatus(book.readingStatus)}
                  <Box>
                    <Typography variant="h6" noWrap>
                      {bookInfo?.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {bookInfo?.author}
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
                      navigateToBookDetailPage(navigate, book.isbn)
                    }
                  >
                    책 보러 가기
                  </Button>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => onMenuOpen(e, book.isbn)}
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
