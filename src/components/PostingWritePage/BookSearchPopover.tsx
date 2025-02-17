import { Box, Popover } from '@mui/material';
import { postingWriteStyles } from './PostingWrite.styles';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';

export interface BookSearchPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}
const BookSearchPopover = ({
  anchorEl,
  onClose,
  selectedBook,
  setSelectedBook,
}: BookSearchPopoverProps) => (
  <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Box sx={postingWriteStyles.bookSearchBox}>
      <BookSearchAutoComplete
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
    </Box>
  </Popover>
);

export default BookSearchPopover;
