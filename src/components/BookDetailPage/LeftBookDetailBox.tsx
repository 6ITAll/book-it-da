import { Box } from '@mui/material';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface LeftBookDetailBoxProps {
  cover: string;
  title: string;
}

const LeftBookDetailBox = ({
  cover,
  title,
}: LeftBookDetailBoxProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.leftBox}>
      <Box
        component="img"
        src={cover}
        alt={title || 'Book Cover'}
        sx={bookDetailStyles.imageStyle}
      />
    </Box>
  );
};

export default LeftBookDetailBox;
