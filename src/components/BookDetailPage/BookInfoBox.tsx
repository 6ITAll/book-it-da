import { Box, Typography } from '@mui/material';

interface BookInfoBoxProps {
  title?: string;
  subTitle?: string;
  author?: string;
  categoryName?: string;
  pubDate?: string;
}

const BookInfoBox = ({
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
}: BookInfoBoxProps): JSX.Element => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: '1.5rem' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: '1rem' }}>
        {subTitle}
      </Typography>
      <Typography variant="h6" sx={{ mb: '1rem' }}>
        {author}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: '1rem' }}>
        {categoryName} · {pubDate}
      </Typography>
    </Box>
  );
};

export default BookInfoBox;
