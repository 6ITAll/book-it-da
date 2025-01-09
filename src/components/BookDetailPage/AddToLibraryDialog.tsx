import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from '@mui/material';
import {
  useGetBookshelvesQuery,
  useAddBookToBookshelfMutation,
  useAddBookshelfMutation,
} from '@features/BookDetailPage/api/AddToLibraryApi';

interface Bookshelf {
  bookshelfId: number;
  bookshelfName: string;
}

interface AddToLibraryModalProps {
  open: boolean;
  onClose: () => void;
  itemId: number;
  title: string;
  author: string;
  imageUrl: string;
}

const getUserId = (): string | null => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  return Array.isArray(userInfo) && userInfo.length > 0
    ? userInfo[0].userId
    : null;
};

const AddToLibraryModal = ({
  open,
  onClose,
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

  // userId가 null일 경우 빈 배열 처리
  const { data: bookshelves = [], refetch } = useGetBookshelvesQuery(
    userId || '',
    {
      skip: !userId, // userId가 없으면 쿼리 실행하지 않음
    },
  );
  // 책장 추가 함수
  const [addBookshelf] = useAddBookshelfMutation();
  // 책 추가 함수
  const [addBookToBookshelf] = useAddBookToBookshelfMutation();

  // 책 담기 함수
  const handleAddBook = async () => {
    if (selectedBookshelf) {
      const newBook = {
        itemId,
        title,
        author,
        imageUrl,
      };
      console.log('newBook:', newBook);
      try {
        await addBookToBookshelf({
          itemId: itemId || 0,
          userId: userId || '',
          bookshelfId: selectedBookshelf,
          book: newBook,
        }).unwrap();
        console.log(`"${newBook.title}" 책을 추가했습니다.`);
        onClose();
      } catch (error) {
        console.error('책 추가 중 오류 발생:', error);
      }
    }
  };

  // 책장 선택 함수
  const handleSelectBookshelf = (bookshelfId: number) => {
    setSelectedBookshelf(bookshelfId);
  };

  // 책장 추가 함수
  const handleAddBookshelf = async () => {
    if (newBookshelfName.trim()) {
      try {
        const response = await addBookshelf({
          userId: userId || '',
          bookshelfName: newBookshelfName,
        }).unwrap();
        refetch();
        console.log('새 책장 추가:', response.bookshelf);
        setNewBookshelfName('');
        setIsCreating(false);
      } catch (error) {
        console.error('책장 추가 중 오류 발생:', error);
      }
    }
  };

  useEffect(() => {
    let previouslyFocusedElement = document.activeElement as HTMLElement;

    if (open) {
      // 현재 포커스된 요소가 HTMLElement인지 확인 후 저장
      if (document.activeElement instanceof HTMLElement) {
        previouslyFocusedElement = document.activeElement;
      }

      // 다이얼로그 내부의 첫 번째 포커스 가능한 요소로 이동
      const firstFocusableElement = document.querySelector(
        '.MuiDialog-container button, .MuiDialog-container input',
      ) as HTMLElement | null;

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    } else if (previouslyFocusedElement) {
      // 다이얼로그 닫힐 때 이전 포커스된 요소로 복원
      previouslyFocusedElement.focus();
    }
  }, [open]);

  useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    const dialogRoot = document.getElementById('root');

    if (open) {
      if (appContainer && dialogRoot) {
        appContainer.setAttribute('aria-hidden', 'true');
        dialogRoot.removeAttribute('aria-hidden'); // 다이얼로그 활성화
      }
    } else if (appContainer) {
      appContainer.removeAttribute('aria-hidden');
    }

    return () => {
      if (appContainer) {
        appContainer.removeAttribute('aria-hidden');
      }
    };
  }, [open]);

  return (
    <Dialog
      container={document.getElementById('root')}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
    >
      <DialogTitle>
        <Typography textAlign="center" fontWeight="bold">
          내 서재에 담기
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* 책장 만들기 UI */}
        {!isCreating ? (
          <Typography
            variant="h6"
            color="text.secondary"
            onClick={() => setIsCreating(true)}
            sx={{
              cursor: 'pointer',
              textAlign: 'center',
              border: '1px solid #e6e7e8',
              padding: '1rem',
              borderRadius: 1,
              height: 38,
              lineHeight: '38px',
            }}
          >
            + 책장 만들기
          </Typography>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="새 책장 이름 입력"
              value={newBookshelfName}
              onChange={(e) => setNewBookshelfName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 48, // 외부 박스 높이
                },
              }}
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
        {/* 책장 선택 라디오 버튼 */}
        <Typography variant="body2" color="text.secondary" mt={2} mb={2}>
          책장을 선택하면 함께 담을 수 있어요
        </Typography>
        <RadioGroup
          value={selectedBookshelf}
          onChange={(e) => handleSelectBookshelf(Number(e.target.value))}
        >
          {bookshelves.length > 0 ? (
            bookshelves.map((shelf: Bookshelf) => (
              <FormControlLabel
                key={shelf.bookshelfId}
                value={shelf.bookshelfId}
                control={<Radio />}
                label={shelf.bookshelfName}
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={onClose} sx={{ color: '#555' }}>
          취소
        </Button>
        <Button
          variant="contained"
          disabled={!selectedBookshelf}
          onClick={handleAddBook}
        >
          담기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToLibraryModal;
