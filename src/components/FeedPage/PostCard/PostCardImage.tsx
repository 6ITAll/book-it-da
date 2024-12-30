import { Box, CardMedia } from '@mui/material';
import { styles } from './PostCard.styles';

interface BookImageProps {
  imageUrl: string;
  title: string;
}

const BookImage = ({ imageUrl, title }: BookImageProps) => (
  <Box sx={styles.cardMediaBox}>
    <CardMedia
      component="img"
      image={imageUrl}
      alt={title}
      sx={styles.cardBackground}
    />
    <Box sx={styles.bookImageBox}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={styles.bookImage}
      />
    </Box>
  </Box>
);

export default BookImage;
