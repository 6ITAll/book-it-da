<<<<<<<< HEAD:src/components/NotFoundPage/NotFoundContent.tsx
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
========
import NotFoundContent from '@components/NotFoundPage/NotFoundContent';
import { Box } from '@mui/material';

const NotFoundPage = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#ffffff',
      }}
    >
      <NotFoundContent />
    </Box>
>>>>>>>> f488e60 (🎨refactor: Split NotFoundPage into Components):src/pages/NotFoundPage/NotFound.tsx
  );
};

export default NotFoundContent;
