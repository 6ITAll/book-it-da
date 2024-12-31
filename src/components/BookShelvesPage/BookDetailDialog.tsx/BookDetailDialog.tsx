import CommonBookCard from '@components/commons/CommonBookCard';
import HybridDialog from '@components/commons/HybridDialog';
import { Box, Button, Stack } from '@mui/material';
import { Book } from '@shared/types/type';
import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import { styles } from './BookDetailDialog.styles';
import ReadingStatus from './BookReadingStatus';
interface BookShelvesDetailDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBook: () => void;
  book: Book | null;
}

const BookShelvesDetailDialog = ({
  openDialog,
  setOpenDialog,
  handleDeleteBook,
  book,
}: BookShelvesDetailDialogProps) => {
  const [readingStatus, setReadingStatus] = useState<string | null>(null);

  const handleReadingStatus = (
    _: React.MouseEvent<HTMLElement>,
    newStatus: string | null,
  ) => {
    setReadingStatus(newStatus);
  };

  const contentNode = (
    <Stack sx={{ width: '100%', boxSizing: 'border-box' }}>
      <Box sx={styles.bookPreview}>
        {book && (
          <CommonBookCard
            image={book.imageUrl}
            title={book.bookTitle}
            author={book.author}
            sx={styles.bookCard}
          />
        )}
      </Box>

      <Stack sx={styles.mainButtonStack}>
        <Button
          variant="outlined"
          startIcon={<BookIcon />}
          sx={styles.mainButton}
        >
          책 정보
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={styles.mainButton}
        >
          글쓰기
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          sx={styles.mainButton}
        >
          공유하기
        </Button>
      </Stack>
      <Stack>
        <ReadingStatus
          readingStatus={readingStatus}
          handleReadingStatus={handleReadingStatus}
        />
        <Button
          fullWidth
          startIcon={<BookmarkBorderIcon />}
          sx={styles.subButtons}
        >
          책장에 담기
        </Button>
        <Button
          fullWidth
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{
            ...styles.subButtons,
            color: 'error.main',
          }}
          onClick={handleDeleteBook}
        >
          책장에서 삭제
        </Button>
      </Stack>
    </Stack>
  );
  return (
    <>
      <HybridDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="책 관리"
        contentNode={contentNode}
      />
    </>
  );
};

export default BookShelvesDetailDialog;
