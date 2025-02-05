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
import { ReadingStatusType } from '@shared/types/type';
import AddToLibraryModal from '@components/BookDetailPage/AddToLibraryDialog';
import PostTypeSelectDialog from '@components/FeedPage/PostTypeSelectDialog/PostTypeSelectDialog';
import { navigateToBookDetailPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';
import URLShareDialog from '@components/commons/URLShareDialog';
import { useSearchBookByIsbnQuery } from '@features/commons/bookSearchByIsbn';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { UserInfo } from '@features/user/userSlice';
import { useUpdateReadingStatusMutation } from '@features/BookShelvesPage/api/bookShelvesApi';
interface BookShelvesDetailDialogProps {
  username: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBook: () => void;
  book: SavedBook;
}

const BookShelvesDetailDialog = ({
  username,
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
  const { data: bookInfo } = useSearchBookByIsbnQuery({ isbn: book?.isbn });

  const { id: currentUserId, username: currentUsername } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );

  const [updateReadingStatus] = useUpdateReadingStatusMutation();

  const handleReadingStatus = async (
    _: React.MouseEvent<HTMLElement>,
    newStatus: ReadingStatusType,
  ) => {
    if (!book) return;

    try {
      await updateReadingStatus({
        userId: currentUserId,
        isbn: book.isbn,
        status: newStatus,
      });
      setReadingStatus(newStatus);
    } catch (error) {
      console.error('Failed to update reading status:', error);
    }
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/bookDetail/${book?.isbn}`;
  };

  const handleWriteClick = () => {
    navigate('/posting/write', { state: { book } });
  };

  const handleShareClick = () => {
    setOpenShareDialog(true);
  };

  const handleCloseShareDialog = () => {
    setOpenShareDialog(false);
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
            image={bookInfo?.cover ?? ''}
            title={bookInfo?.title ?? ''}
            author={bookInfo?.author ?? ''}
            sx={bookDetailDialogStyles.bookCard}
          />
        )}
      </Box>

      <Stack sx={bookDetailDialogStyles.mainButtonStack}>
        <Button
          variant="outlined"
          startIcon={<BookIcon />}
          sx={bookDetailDialogStyles.mainButton}
          onClick={() => navigateToBookDetailPage(navigate, book.isbn)}
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
        {currentUsername === username && (
          <ReadingStatus
            readingStatus={readingStatus}
            handleReadingStatus={handleReadingStatus}
          />
        )}
        <Button
          fullWidth
          startIcon={<BookmarkBorderIcon />}
          sx={bookDetailDialogStyles.subButtons}
          onClick={handleAddToLibrary}
        >
          책장에 담기
        </Button>
        {currentUsername === username && (
          <Button
            fullWidth
            startIcon={<DeleteOutlineIcon />}
            sx={(theme) => ({
              ...bookDetailDialogStyles.subButtons(theme),
              color: theme.palette.error.main, // 텍스트 색상
            })}
            onClick={() => {
              handleDeleteBook();
              setOpenDialog(false);
            }}
          >
            책장에서 삭제
          </Button>
        )}
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
        setOpen={handleCloseAddToLibrary}
        isbn={book?.isbn}
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
