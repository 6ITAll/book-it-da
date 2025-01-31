import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Bookshelf } from '@shared/types/type';

const BookshelfCard = ({
  shelf,
  userId,
}: {
  shelf: Bookshelf;
  userId: string;
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClick = () => {
    navigate(`/my-page/${userId}/bookshelves/${shelf.id}`);
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
              <CardMedia
                component="img"
                image={book.imageUrl}
                alt={`${book.title} cover`}
              />
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
