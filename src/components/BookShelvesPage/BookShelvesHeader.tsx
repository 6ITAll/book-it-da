import { Box, Typography } from '@mui/material';
import { bookShelvesStyles } from './BookShelves.styles';

interface BookshelfHeaderProps {
  name: string;
  bookCount: number;
}

const BookshelfHeader = ({ name, bookCount }: BookshelfHeaderProps) => {
  return (
    <Box sx={bookShelvesStyles.bookShelfHeader}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {bookCount}권
      </Typography>
    </Box>
  );
};

export default BookshelfHeader;
