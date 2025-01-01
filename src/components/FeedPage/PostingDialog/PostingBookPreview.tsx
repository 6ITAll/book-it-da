import { Box } from '@mui/material';
import CommonBookCard from '@components/commons/CommonBookCard';
import { Book } from '@shared/types/type';
import { styles } from './PostingDialog.styles';

interface BookPreviewSectionProps {
  book: Book;
}

export const BookPreviewSection = ({ book }: BookPreviewSectionProps) => (
  <Box sx={styles.bookPreviewBox}>
    <CommonBookCard
      image={book.imageUrl}
      title={book.bookTitle}
      author={book.author}
      sx={styles.bookCard}
    />
  </Box>
);
