import { Box, Typography } from '@mui/material';

interface BookshelfHeaderProps {
  name: string;
  bookCount: number;
}

const BookshelfHeader = ({ name, bookCount }: BookshelfHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
        gap: '5px',
      }}
    >
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {bookCount}권
      </Typography>
    </Box>
  );
};

export default BookshelfHeader;
