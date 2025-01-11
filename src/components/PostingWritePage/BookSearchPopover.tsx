import { Box, Popover } from '@mui/material';
import { postingWriteStyles } from './PostingWrite.styles';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';

export interface BookSearchPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}
const BookSearchPopover = ({
  anchorEl,
  onClose,
  searchQuery,
  setSearchQuery,
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
    </Box>
  </Popover>
);

export default BookSearchPopover;
