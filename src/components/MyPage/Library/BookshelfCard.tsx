import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import BookShelfThumbnail from './BookShelfThumbnail';
import { Bookshelf } from '../types';

interface BookshelfCardProps {
  shelf: Bookshelf;
  username: string;
}

const BookshelfCard = ({ shelf, username }: BookshelfCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClick = () => {
    navigate(`/my-page/${username}/bookshelves/${shelf.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: sm ? 200 : '100%',
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Grid2 container height={140} overflow="hidden">
          {shelf.books.map((book) => (
            <Grid2
              key={`${book.isbn}-${shelf.id}`}
              size={shelf.books.length === 1 ? 12 : 6}
              height={shelf.books.length > 2 ? '50%' : '100%'}
            >
              <BookShelfThumbnail isbn={book.isbn} />
            </Grid2>
          ))}
        </Grid2>
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
