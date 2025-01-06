import { Box } from '@mui/material';
import CommonBookCard from '@components/commons/CommonBookCard';
import { Book } from '@shared/types/type';
import styles from './OneLineReviewDialog.styles';

interface BookPreviewSectionProps {
  book: Book;
}

const BookPreviewSection = ({ book }: BookPreviewSectionProps): JSX.Element => (
  <Box sx={styles.bookPreviewBox}>
    <CommonBookCard
      image={book.imageUrl}
      title={book.bookTitle}
      author={book.author}
      sx={styles.bookCard}
    />
  </Box>
);

export default BookPreviewSection;
