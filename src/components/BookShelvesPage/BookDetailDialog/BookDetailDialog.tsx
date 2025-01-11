import CommonBookCard from '@components/commons/CommonBookCard';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import { Box, Button, Stack } from '@mui/material';
import { SavedBook } from '@shared/types/type';
import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import { bookDetailDialogStyles } from './BookDetailDialog.styles';
import ReadingStatus from './BookReadingStatus';
import { useUpdateReadingStatusMutation } from '@features/BookShelvesPage/api/bookShelvesApi';
import { ReadingStatusType } from '@shared/types/type';
import AddToLibraryModal from '@components/BookDetailPage/AddToLibraryDialog';
import PostTypeSelectDialog from '@components/FeedPage/PostTypeSelectDialog/PostTypeSelectDialog';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import URLShareDialog from '@components/commons/URLShareDialog';
interface BookShelvesDetailDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBook: () => void;
  book: SavedBook;
}

const BookShelvesDetailDialog = ({
  openDialog,
  setOpenDialog,
  handleDeleteBook,
  book,
}: BookShelvesDetailDialogProps) => {
  const navigate = useNavigate();
  const [readingStatus, setReadingStatus] = useState<ReadingStatusType>(
    book?.readingStatus || null,
  );
  const [openAddToLibraryDialog, setOpenAddToLibraryDialog] = useState(false);
  const [openWriteDialog, setOpenWriteDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [updateStatus] = useUpdateReadingStatusMutation();

  const handleReadingStatus = async (
    _: React.MouseEvent<HTMLElement>,
    newStatus: ReadingStatusType,
  ) => {
    if (!book) return;

    try {
      await updateStatus({
        userId: 1,
        bookshelfId: book.bookshelfId,
        itemId: book.itemId,
        readingStatus: newStatus,
      });
      setReadingStatus(newStatus);
    } catch (error) {
      console.error('Failed to update reading status:', error);
    }
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/bookDetail/${book?.itemId}`;
  };

  const handleWriteClick = () => {
    navigate('/posting/write', { state: { book } });
  };

  const handleShareClick = () => {
    setOpenShareDialog(true); // 공유 모달 열기
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false); // 공유 모달 닫기
  };

  const handleCloseWrite = () => {
    setOpenWriteDialog(false);
  };

  const handleAddToLibrary = () => {
    setOpenAddToLibraryDialog(true);
  };

  const handleCloseAddToLibrary = () => {
    setOpenAddToLibraryDialog(false);
  };

  const contentNode = (
    <Stack sx={{ width: '100%', boxSizing: 'border-box' }}>
      <Box sx={bookDetailDialogStyles.bookPreview}>
        {book && (
          <CommonBookCard
            image={book.imageUrl}
            title={book.bookTitle}
            author={book.author}
            sx={bookDetailDialogStyles.bookCard}
          />
        )}
      </Box>

      <Stack sx={bookDetailDialogStyles.mainButtonStack}>
        <Button
          variant="outlined"
          startIcon={<BookIcon />}
          sx={bookDetailDialogStyles.mainButton}
          onClick={() => navigateToBookDetailPage(navigate, book.itemId)}
        >
          책 정보
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={bookDetailDialogStyles.mainButton}
          onClick={handleWriteClick}
        >
          글쓰기
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          sx={bookDetailDialogStyles.mainButton}
          onClick={handleShareClick}
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
          sx={bookDetailDialogStyles.subButtons}
          onClick={handleAddToLibrary}
        >
          책장에 담기
        </Button>
        <Button
          fullWidth
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{
            ...bookDetailDialogStyles.subButtons,
            color: 'error.main',
          }}
          onClick={() => {
            handleDeleteBook();
            setOpenDialog(false);
          }}
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
      <AddToLibraryModal
        open={openAddToLibraryDialog}
        onClose={handleCloseAddToLibrary}
        itemId={book?.itemId}
        title={book?.bookTitle}
        author={book?.author}
        imageUrl={book?.imageUrl}
      />
      <PostTypeSelectDialog
        dialogOpen={openWriteDialog}
        setDialogOpen={handleCloseWrite}
      />
      <URLShareDialog
        open={openShareDialog}
        handleClose={handleCloseShareDialog}
        url={getShareUrl()}
      />
    </>
  );
};

export default BookShelvesDetailDialog;
