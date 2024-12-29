import { useState } from 'react';
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

interface AddToLibraryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddToLibraryModal = ({
  open,
  onClose,
}: AddToLibraryModalProps): JSX.Element => {
  const [bookshelves, setBookshelves] = useState<string[]>([
    'My Favorite',
    '2525',
    '2024-12-22',
  ]);
  const [selectedBookshelf, setSelectedBookshelf] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newBookshelfName, setNewBookshelfName] = useState<string>('');

  // 책장 추가 함수
  const handleAddBookshelf = () => {
    if (newBookshelfName.trim()) {
      setBookshelves([...bookshelves, newBookshelfName]);
      setNewBookshelfName('');
      setIsCreating(false);
    }
  };

  // 책장 선택 함수
  const handleSelectBookshelf = (bookshelf: string) => {
    setSelectedBookshelf(bookshelf);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: 2, p: 2 },
      }}
    >
      <DialogTitle>
        <Typography textAlign="center" variant="h6" fontWeight="bold">
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
        <Typography variant="body2" color="text.secondary" mb={2}>
          책장을 선택하면 함께 담을 수 있어요
        </Typography>
        <RadioGroup
          value={selectedBookshelf}
          onChange={(e) => handleSelectBookshelf(e.target.value)}
        >
          {bookshelves.map((shelf, index) => (
            <FormControlLabel
              key={index}
              value={shelf}
              control={<Radio />}
              label={shelf}
              sx={{
                '& .MuiTypography-root': { fontSize: 14 },
              }}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={onClose} sx={{ color: '#555' }}>
          취소
        </Button>
        <Button
          variant="contained"
          disabled={!selectedBookshelf}
          onClick={() => {
            console.log(`"${selectedBookshelf}" 책장에 책을 추가했습니다.`);
            onClose();
          }}
        >
          담기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToLibraryModal;
