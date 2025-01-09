import { useState } from 'react';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import {
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Button,
} from '@mui/material';
import {
  useGetBookshelvesQuery,
  useAddBookToBookshelfMutation,
  useAddBookshelfMutation,
} from '@features/BookDetailPage/api/AddToLibraryApi';
import { ResponseBookshelf } from '@components/BookDetailPage/types';
import { bookDetailStyles } from './BookDetail.styles';

const getUserId = (): string | null => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  return Array.isArray(userInfo) && userInfo.length > 0
    ? userInfo[0].userId
    : null;
};

interface AddToLibraryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

const AddToLibraryModal = ({
  open,
  setOpen,
  itemId,
  title,
  author,
  imageUrl,
}: AddToLibraryModalProps): JSX.Element => {
  const [selectedBookshelf, setSelectedBookshelf] = useState<number | null>(
    null,
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newBookshelfName, setNewBookshelfName] = useState<string>('');

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
      const newBook = { itemId, title, author, imageUrl };
      try {
        await addBookToBookshelf({
          itemId: itemId || 0,
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
  const handleAddBookshelf = async () => {
    if (newBookshelfName.trim()) {
      try {
        await addBookshelf({
          userId: userId || '',
          name: newBookshelfName, // 요청 필드
        }).unwrap();
        refetch();
        setNewBookshelfName('');
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
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="새 책장 이름 입력"
            value={newBookshelfName}
            onChange={(e) => setNewBookshelfName(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { height: 48 } }}
          />
          <Button
            variant="contained"
            onClick={handleAddBookshelf}
            sx={{ height: '48px' }}
          >
            추가
          </Button>
        </Stack>
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
