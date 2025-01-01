import { Box, Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 3,
        }}
      >
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
