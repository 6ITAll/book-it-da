import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import { Bookshelf } from '@shared/types/type';

const BookshelfCard = ({ shelf }: { shelf: Bookshelf }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
      }}
    >
      <CardActionArea>
        <Grid2 container height={140} overflow="hidden">
          {shelf.books.map((book) => (
            <Grid2
              key={book.itemId}
              size={shelf.books.length === 1 ? 12 : 6} // 1권이면 전체, 그 외 반반
            >
              <CardMedia
                key={book.itemId}
                component="img"
                image={book.imageUrl}
                alt={`${book.bookTitle} cover`}
                width="100%"
                height="100%"
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
