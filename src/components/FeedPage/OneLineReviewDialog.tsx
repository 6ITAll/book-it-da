import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';

interface OneLineReviewDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const OneLineReviewDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: OneLineReviewDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
    }
  }, [selectedType]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={selectedType === 'review'}
      onClose={() => setSelectedType(null)}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography>한줄평 작성</Typography>
          </Stack>
          <IconButton onClick={() => setSelectedType(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          '&.MuiDialogContent-root': {
            padding: '30px 20px',
          },
        }}
      >
        <BookSearchAutoComplete
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />

        {selectedBook && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.bookTitle}
                style={{ width: 60, height: 90 }}
              />
              <Stack>
                <Typography>{selectedBook.bookTitle}</Typography>
                <Typography variant="body2">{selectedBook.author}</Typography>
                <Typography>{selectedBook.itemId}</Typography>
              </Stack>
            </Stack>
          </Box>
        )}

        <TextField
          fullWidth
          multiline
          label="한줄평"
          variant="outlined"
          placeholder="한줄평을 입력하세요"
          minRows={12}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '200px',
              '& textarea': {
                height: '100% !important',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '0',
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: '0',
            width: '100%',
            padding: '10px',
            borderRadius: '0px 0px 10px 10px',
          }}
        >
          한줄평 작성
        </Button>{' '}
      </DialogActions>
    </Dialog>
  );
};

export default OneLineReviewDialog;
