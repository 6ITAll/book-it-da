import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BestBookCarousel from '@components/BookSearchPage/BestBookCarousel';
import styles from '@components/NotFoundPage/NotFoundContent.style';
import { navigateToMainPage } from '@shared/utils/navigation';

const NotFoundContent = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigateToMainPage(navigate);
  };

  return (
    <>
      <Typography variant="h4" sx={styles.title}>
        페이지를 찾을 수 없습니다
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={styles.button}
      >
        메인 페이지로 이동
      </Button>
      <Box sx={styles.carouselContainer}>
        <Typography variant="h5" sx={styles.carouselTitle}>
          베스트셀러
        </Typography>
        <BestBookCarousel />
      </Box>
    </>
  );
};

export default NotFoundContent;
