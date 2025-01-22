import { Box, Skeleton } from '@mui/material';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface LeftBookDetailBoxProps {
  cover: string;
  title: string;
  isLoading: boolean;
}

const LeftBookDetailBox = ({
  cover,
  title,
  isLoading,
}: LeftBookDetailBoxProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.leftBox}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="80%"
          height="300px"
          sx={{ borderRadius: '8px' }}
        />
      ) : (
        <Box
          component="img"
          src={cover}
          alt={title || 'Book Cover'}
          sx={bookDetailStyles.imageStyle}
        />
      )}
    </Box>
  );
};

export default LeftBookDetailBox;
