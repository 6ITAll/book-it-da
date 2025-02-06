import { useState } from 'react';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import {
  useGetBookshelvesQuery,
  useAddBookToBookshelfMutation,
  useAddBookshelfMutation,
} from '@features/BookDetailPage/api/AddToLibraryApi';
import { ResponseBookshelf } from '@components/BookDetailPage/types';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import BookshelfCreate from './BookShelfCreate';

const getUserId = (): string | null => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  return Array.isArray(userInfo) && userInfo.length > 0
    ? userInfo[0].userId
    : null;
};

interface AddToLibraryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isbn: string;
  title: string;
  author: string;
  imageUrl: string;
}

const AddToLibraryModal = ({
  open,
  setOpen,
  isbn,
  title,
  author,
  imageUrl,
}: AddToLibraryModalProps): JSX.Element => {
  const [selectedBookshelf, setSelectedBookshelf] = useState<number | null>(
    null,
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const userId = getUserId();

  // 책장 목록 가져오기
  const { data: bookshelves = [], refetch } = useGetBookshelvesQuery(
    userId || '',
    { skip: !userId },
  );

  // 책장 추가 API 호출
  const [addBookshelf] = useAddBookshelfMutation();

  // 책 추가 API 호출
  const [addBookToBookshelf] = useAddBookToBookshelfMutation();

  // 책 추가 함수
  const handleAddBook = async () => {
    if (selectedBookshelf) {
      const newBook = { isbn, title, author, imageUrl };
      try {
        await addBookToBookshelf({
          isbn: isbn || '',
          userId: userId || '',
          id: selectedBookshelf,
          book: newBook,
        }).unwrap();
        setOpen(false);
      } catch (error) {
        console.error('책 추가 중 오류 발생:', error);
      }
    }
  };

  // 책장 추가 함수
  const handleOnAddBookshelf = async (
    newBookshelfName: string,
  ): Promise<void> => {
    if (newBookshelfName.trim()) {
      try {
        await addBookshelf({
          userId: userId || '',
          name: newBookshelfName,
        }).unwrap();
        refetch();
        setIsCreating(false);
      } catch (error) {
        console.error('책장 추가 중 오류 발생:', error);
      }
    }
  };

  const contentNode = (
    <>
      {!isCreating ? (
        <Button
          onClick={() => setIsCreating(true)}
          sx={bookDetailStyles.addBookShelfButton}
        >
          + 책장 만들기
        </Button>
      ) : (
        <BookshelfCreate onAdd={handleOnAddBookshelf} />
      )}
      <Typography variant="body2" color="text.secondary" mt={2} mb={2}>
        책장을 선택하면 함께 담을 수 있어요
      </Typography>
      <RadioGroup
        value={selectedBookshelf}
        onChange={(e) => setSelectedBookshelf(Number(e.target.value))}
      >
        {bookshelves.length > 0 ? (
          bookshelves.map((shelf: ResponseBookshelf) => (
            <FormControlLabel
              key={shelf.id}
              value={shelf.id}
              control={<Radio />}
              label={shelf.name}
              sx={{
                '& .MuiTypography-root': { fontSize: 14 },
              }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            책장이 없습니다. 새 책장을 만들어주세요.
          </Typography>
        )}
      </RadioGroup>
    </>
  );

  return (
    <HybridDialog
      title="내 서재에 담기"
      contentNode={contentNode}
      action="담기"
      onActionClick={handleAddBook}
      open={open}
      setOpen={setOpen}
      maxWidth="xs"
    />
  );
};

export default AddToLibraryModal;
