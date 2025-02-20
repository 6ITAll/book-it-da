import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BookShelfThumbnail from './BookShelfThumbnail';
import { Bookshelf } from '../types';
import { navigateToBookShelvesPage } from '@shared/utils/navigation';

interface BookshelfCardProps {
  shelf: Bookshelf;
  username: string;
}

const BookshelfCard = ({ shelf, username }: BookshelfCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Card
      sx={{
        width: sm ? 200 : '100%',
        maxWidth: 200,
      }}
    >
      <CardActionArea
        onClick={() => navigateToBookShelvesPage(navigate, username, shelf.id)}
      >
        <Grid
          container
          height={140}
          overflow="hidden"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {shelf.books.length > 0 ? (
            shelf.books.map((book) => (
              <Grid
                item
                key={`${book.isbn}-${shelf.id}`}
                xs={shelf.books.length === 1 ? 12 : 6}
                sx={{ height: shelf.books.length > 2 ? '50%' : '100%' }}
              >
                <BookShelfThumbnail isbn={book.isbn} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                책이 없습니다
              </Typography>
            </Grid>
          )}
        </Grid>
        <CardContent>
          <Typography gutterBottom>{shelf.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {shelf.bookCount}권
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookshelfCard;
