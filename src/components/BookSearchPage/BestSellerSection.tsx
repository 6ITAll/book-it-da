import { Box, Typography } from '@mui/material';
import BestBookCarousel from '@components/BookSearchPage/BestBookCarousel';

const BestSellerSection = (): JSX.Element => {
  return (
    <Box
      sx={{
        width: '100%',
        marginBottom: 5,
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        베스트셀러
      </Typography>
      <BestBookCarousel />
    </Box>
  );
};

export default BestSellerSection;
