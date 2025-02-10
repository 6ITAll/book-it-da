import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BestBookCarousel from '@components/BookSearchPage/BestBookCarousel';

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

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
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        페이지를 찾을 수 없습니다
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ marginBottom: '3rem' }}
      >
        메인 페이지로 이동
      </Button>
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
          베스트셀러
        </Typography>
        <BestBookCarousel />
      </Box>
    </Box>
  );
};

export default NotFoundPage;
