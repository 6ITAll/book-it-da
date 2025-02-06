import { Box } from '@mui/material';
import CommonBookCard from '@components/commons/CommonBookCard';
import { Book } from '@shared/types/type';
import { postingWriteStyles } from './PostingWrite.styles';

interface BookPreviewSectionProps {
  book: Book;
}

export const BookPreviewSection = ({ book }: BookPreviewSectionProps) => (
  <Box sx={postingWriteStyles.bookPreviewBox}>
    <CommonBookCard
      image={book.imageUrl ?? ''}
      title={book.title ?? ''}
      author={book.author}
      sx={postingWriteStyles.bookCard}
    />
  </Box>
);
