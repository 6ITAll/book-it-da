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
  );
};

export default NotFoundPage;
