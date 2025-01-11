import { Box, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DoneIcon from '@mui/icons-material/Done';
import { ReadingStatusType } from '@shared/types/type';

export const renderReadingStatus = (readingStatus: ReadingStatusType) => {
  switch (readingStatus) {
    case 'READING':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
          <MenuBookIcon />
          <Typography variant="body2">읽고 있는 책</Typography>
        </Box>
      );
    case 'COMPLETED':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
          <DoneIcon />
          <Typography variant="body2">완독한 책</Typography>
        </Box>
      );
    case 'WISH':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
          <BookmarkIcon />
          <Typography variant="body2">읽고 싶은 책</Typography>
        </Box>
      );
    default:
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}
        ></Box>
      );
  }
};

export const renderReadingStatusIcon = (readingStatus: ReadingStatusType) => {
  const iconStyle = {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '4px',
  };

  switch (readingStatus) {
    case 'READING':
      return <MenuBookIcon sx={iconStyle} />;
    case 'COMPLETED':
      return <DoneIcon sx={iconStyle} />;
    case 'WISH':
      return <BookmarkIcon sx={iconStyle} />;
    default:
      return null;
  }
};
