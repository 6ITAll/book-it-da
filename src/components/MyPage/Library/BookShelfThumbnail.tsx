import { Box, CardMedia } from '@mui/material';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';

interface BookShelfThumbnailProps {
  isbn: string;
}

const BookShelfThumbnail = ({ isbn }: BookShelfThumbnailProps) => {
  const { data, isLoading, error } = useSearchBookByIsbnQuery({ isbn });

  if (isLoading) {
    return (
      <Box
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading...
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        No Cover
      </Box>
    );
  }

  return (
    <CardMedia component="img" image={data.cover} alt={`${data.title} cover`} />
  );
};

export default BookShelfThumbnail;
